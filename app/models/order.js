import DS from 'ember-data';

export default DS.Model.extend({
  dateTime: DS.attr('date'),
  estimatedTime: DS.attr('string', { defaultValue: '45' }),
  paymentMethod: DS.attr('string', { defaultValue: '' }),
  notes: DS.attr('string'),
  orderItems: DS.hasMany('order-item'),
  customer: DS.belongsTo('customer', { polymorphic: true }),

  total: function() {
    return this.get('orderItems').reduce(
      function(prev, orderItem) {
        return prev + orderItem.get('total');
      }, 0);
  }.property('orderItems.@each.quantity', 'orderItems.@each.total'),  //TODO: (Warning) Bug with ember 2.2.0 when upgrading

  displayTotal: function() {
    return (this.get('total') / 100).toFixed(2);
  }.property('total'),

  size: function() {
    return this.get('orderItems').reduce(
      function(prev, orderItem) {
        return prev + orderItem.get('quantity');
      }, 0);
  }.property('orderItems.@each.quantity'), //TODO: (Warning) Bug with ember 2.2.0 when upgrading

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
