import Ember from 'ember';
import { ReceiptType } from '../../models/receipt-type';

export default Ember.Controller.extend({

  sortByTime: ['dateTime:desc'],

  ordersSortedByTimestamp: Ember.computed.sort('model', 'sortByTime'),

  _filterByPaymentMethod(orders, paymentMethod) {
    return orders.filter(function(order) {
      return order.get('paymentMethod') === paymentMethod;
    });
  },

  _getNamespace() {
    let namespace = this.store.adapterFor('application').get('namespace');
    return [namespace, 'printer'].join('/');
  },

  _getRequest(url, loadingMessage, successMessage, errorMessage) {
    this.send('showMessage', 'loader', { message: loadingMessage });

    Ember.$.get(url)
      .then(() => {
        this.send('dismissMessage', 'loader');
        this.send('showMessage', 'overlay', { header: successMessage });
      }, (response) => {
        this.send('dismissMessage', 'loader');
        this.send('showMessage', 'overlay', {
          header: errorMessage,
          body: response.responseText ? response.responseText : response.errors[0].message
        });
      });
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

    /**
     * @param {number} id - id of order to print
     * @param {ReceiptType} receiptType - receipt type for printing
     */
    printOrder(id, receiptType) {
      let url = [this._getNamespace(), 'order', receiptType || ReceiptType.EAT_IN, id].join('/');
      this._getRequest(url, 'Printing receipt', 'Order printed successfully', 'Order failed to print');
    },

    printOrderSummary() {
      let url = [this._getNamespace(), 'order-summary'].join('/');
      this._getRequest(url, 'Printing summary', 'Summary printed successfully', 'Summary failed to print');
    }

  }

});
