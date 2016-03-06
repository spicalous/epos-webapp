import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  dateTime: DS.attr('date'),
  estimatedTime: DS.attr('number', { defaultValue: 45 }),
  paymentMethod: DS.attr('string', { defaultValue: null }),
  notes: DS.attr('string'),
  orderItems: DS.hasMany('order-item'),
  customer: DS.belongsTo('customer', { polymorphic: true }),

  //TODO: (Warning) Bug with @each in ember 2.2.0
  total: Ember.computed('orderItems.@each.quantity', 'orderItems.@each.total', function() {
    return this.get('orderItems').reduce((prev, orderItem) => prev + orderItem.get('total'), 0);
  }),

  displayTotal: Ember.computed('total', function() {
    return (this.get('total') / 100).toFixed(2);
  }),

  //TODO: (Warning) Bug with @each ember 2.2.0
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
  },

  addNewEditOption(orderItem, option) {
    orderItem.decrementProperty('quantity');
    let orderItems = this.get('orderItems');
    let newOrderItem = this.store.createRecord('order-item', {
      quantity: 1,
      menuItem: orderItem.get('menuItem')
    });

    newOrderItem.toggleOption(option);
    orderItems.pushObject(newOrderItem);
    return newOrderItem;
  }
});
