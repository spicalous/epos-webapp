import Model, { attr, hasMany } from '@ember-data/model';
import { computed } from '@ember/object';

export default class OrderModel extends Model {
  @attr('date') dateTime;
  @attr('string', { defaultValue: null }) paymentMethod;
  @attr('string', { defaultValue: '' }) notes;
  @hasMany('order-item') orderItems;

  @computed('orderItems.{@each.quantity,@each.total}')
  get total() {
    return this.orderItems.reduce((prev, orderItem) => prev + orderItem.total, 0);
  }

}
