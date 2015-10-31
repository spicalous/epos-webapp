import DS from 'ember-data';

export default DS.Model.extend({
  dateTime: DS.attr('date'),
  orderItems: DS.hasMany('order-item'),
  customer: DS.belongsTo('customer'),

  total: function() {
    return this.get('orderItems').reduce(
      function(prev, orderItem) {
        return prev + orderItem.get('total');
      }, 0);
  }.property('orderItems.@each.quantity'),

  displayTotal: function() {
    return (this.get('total') / 100).toFixed(2);
  }.property('total'),

  size: function() {
    return this.get('orderItems').reduce(
      function(prev, orderItem) {
        return prev + orderItem.get('quantity');
      }, 0);
  }.property('orderItems.@each.quantity'),

  addItem: function(menuItem) {
    var orderItems = this.get('orderItems');

    var orderItem = orderItems.any(function(orderItem) {
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
