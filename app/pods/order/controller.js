import Ember from 'ember';

export default Ember.Controller.extend({

  _filterByPaymentMethod(orders, paymentMethod) {
    return orders.filter(function(order) {
      return order.get('paymentMethod') === paymentMethod;
    });
  },

  _getPrinterNamespaceURL() {
    let host = this.store.adapterFor('application').get('host');
    let namespace = this.store.adapterFor('application').get('namespace');
    let url = [host, namespace, 'printer'].join('/');

    return url;
  },

  totalCard: Ember.computed('model', function() {
    let orders = this.get('model');
    let cardOrders = this._filterByPaymentMethod(orders, 'CARD');

    return cardOrders.reduce((prev, order) => prev + order.get('total'), 0);
  }),

  totalCash: Ember.computed('model', function() {
    let orders = this.get('model');
    let cashOrders = this._filterByPaymentMethod(orders, 'CASH');

    return cashOrders.reduce((prev, order) => prev + order.get('total'), 0);
  }),

  totalNotPaid: Ember.computed('model', function() {
    let orders = this.get('model');
    let notPaidOrders = this._filterByPaymentMethod(orders, null);

    return notPaidOrders.reduce((prev, order) => prev + order.get('total'), 0);
  }),

  totalAll: Ember.computed('model', function() {
    let orders = this.get('model');

    return orders.reduce((prev, order) => prev + order.get('total'), 0);
  }),

  actions: {

    printOrder(id) {
      let url = [this._getPrinterNamespaceURL(), 'order', id].join('/');
      Ember.$.get(url).then();
    },

     printOrderSummary() {
       let url = [this._getPrinterNamespaceURL(), 'order-summary'].join('/');
       Ember.$.get(url).then();
     }

  }

});
