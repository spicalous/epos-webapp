import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';
import Ember from 'ember';

export default Model.extend({
  dateTime: attr('date'),
  paymentMethod: attr('string', { defaultValue: null }),
  notes: attr('string'),

  orderItems: hasMany('order-item'),

  total: Ember.computed('orderItems.@each.quantity', 'orderItems.@each.total', function() {
    return this.get('orderItems').reduce((prev, orderItem) => prev + orderItem.get('total'), 0);
  }),

  size: Ember.computed('orderItems.@each.quantity', function() {
    return this.get('orderItems').reduce((prev, orderItem) => prev + orderItem.get('quantity'), 0);
  }),

  addItem(menuItem) {
    let orderItems = this.get('orderItems');

    let orderItem = orderItems.any(function(orderItem) {
      if (orderItem.isMenuItem(menuItem) && orderItem.hasNoEditOptions()) {
        return orderItem;
      }
    });

    if (orderItem) {
      orderItem.incrementProperty('quantity');
    } else {
      orderItems.pushObject(this.store.createRecord('order-item', {
        quantity: 1,
        menuItem: menuItem
      }));
    }
  }

});
