import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import { computed } from '@ember/object';
import { MODIFIER_TYPES } from 'epos-webapp/models/order-modifier';
import formatCurrency from 'epos-webapp/helpers/format-currency';

export default class OrderModel extends Model {
  @attr('date') dateTime;
  @attr('string', { defaultValue: null }) paymentMethod;
  @attr('string', { defaultValue: '' }) notes;
  @hasMany('order-item') orderItems;
  @belongsTo('order-modifier') orderModifier;

  @computed('orderItems.{@each.quantity,@each.total}')
  get total() {
    return this.orderItems.reduce((prev, orderItem) => prev + orderItem.total, 0);
  }

  @computed('total', 'orderModifier.{type,value}')
  get modifierData() {
    let orderModifier = this.belongsTo('orderModifier').value();

    if (orderModifier.type === MODIFIER_TYPES.PERCENT) {
      let result = Math.round(this.total * (orderModifier.value / 100));
      return `-£${formatCurrency.compute([result])} (${orderModifier.value}%)`;
    }
    if (orderModifier.type === MODIFIER_TYPES.ABSOLUTE) {
      return `-£${formatCurrency.compute([orderModifier.value])}`;
    }
    return `Unknown "${orderModifier.type}" type`;
  }

  @computed('total', 'orderModifier.{type,value}')
  get modifiedTotal() {
    let orderModifier = this.belongsTo('orderModifier').value();
    if (orderModifier) {
      if (orderModifier.type === MODIFIER_TYPES.PERCENT) {
        let result = this.total - (this.total * (orderModifier.value / 100));
        // round results with .5 down instead of up
        // Math.round works in javascript as it rounds negative 0.5 towards 0 instead of away e.g. Math.round(-2.5) == -2.0
        let roundedHalfDown = -Math.round(-result);
        return Math.max(0, roundedHalfDown);
      }
      if (orderModifier.type === MODIFIER_TYPES.ABSOLUTE) {
        return Math.max(0, this.total - orderModifier.value);
      }
      console.warn('Unknown order-modifier type:', orderModifier.type);
    }
    return this.total;
  }

}
