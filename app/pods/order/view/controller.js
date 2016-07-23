import Ember from 'ember';
import { ReceiptType } from '../../../models/receipt-type';

export default Ember.Controller.extend({

  sortByTime: ['dateTime:desc'],

  ordersSortedByTimestamp: Ember.computed.sort('model', 'sortByTime'),

  cardOrders: Ember.computed.filterBy('model', 'paymentMethod', 'CARD'),

  cashOrders: Ember.computed.filterBy('model', 'paymentMethod', 'CASH'),

  notPaidOrders: Ember.computed.filterBy('model', 'paymentMethod', null),

  totalCard: Ember.computed('model', function() {
    let cardOrders = this.get('cardOrders');

    return cardOrders.reduce((prev, order) => prev + order.get('total'), 0);
  }),

  totalCash: Ember.computed('model', function() {
    let cashOrders = this.get('cashOrders');

    return cashOrders.reduce((prev, order) => prev + order.get('total'), 0);
  }),

  totalNotPaid: Ember.computed('model', function() {
    let notPaidOrders = this.get('notPaidOrders');

    return notPaidOrders.reduce((prev, order) => prev + order.get('total'), 0);
  }),

  totalAll: Ember.computed('model', function() {
    let orders = this.get('model');

    return orders.reduce((prev, order) => prev + order.get('total'), 0);
  }),

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
