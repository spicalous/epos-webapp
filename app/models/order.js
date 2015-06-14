import DS from "ember-data";

export default DS.Model.extend({
  orderId: DS.attr('string'),
  date: DS.attr('string'),
  orderItems: DS.hasMany('order-item'),
  total: DS.attr('number'),

  addItem: function(menuItem) {
    var orderItems = this.get('orderItems');

    var orderItem = orderItems.any(function(orderItem) {
      if (orderItem.isMenuItem(menuItem)) {
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
