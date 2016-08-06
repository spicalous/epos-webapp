import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  dateTime: attr('date'),
  paymentMethod: attr('string', { defaultValue: null }),
  notes: attr('string'),

  orderItems: hasMany('order-item'),

  /**
   * used to calculated the total of the order
   */
  total: Ember.computed('orderItems.@each.quantity', 'orderItems.@each.total', function() {
    return this.get('orderItems').reduce((prev, orderItem) => prev + orderItem.get('total'), 0);
  })

});
