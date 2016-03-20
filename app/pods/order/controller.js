import Ember from 'ember';

export default Ember.Controller.extend({

  filterByPaymentMethod(orders, paymentMethod) {
    return orders.filter(function(order) {
      return order.get('paymentMethod') === paymentMethod;
    });
  },

  totalCard: Ember.computed('model', function() {
    let orders = this.get('model');
    let cardOrders = this.filterByPaymentMethod(orders, 'CARD');

    return cardOrders.reduce((prev, order) => prev + order.get('total'), 0);
  }),

  totalCash: Ember.computed('model', function() {
    let orders = this.get('model');
    let cashOrders = this.filterByPaymentMethod(orders, 'CASH');

    return cashOrders.reduce((prev, order) => prev + order.get('total'), 0);
  }),

  totalNotPaid: Ember.computed('model', function() {
    let orders = this.get('model');
    let notPaidOrders = this.filterByPaymentMethod(orders, null);

    return notPaidOrders.reduce((prev, order) => prev + order.get('total'), 0);
  }),

  totalAll: Ember.computed('model', function() {
    let orders = this.get('model');

    return orders.reduce((prev, order) => prev + order.get('total'), 0);
  })

});
