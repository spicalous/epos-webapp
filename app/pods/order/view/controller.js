import Ember from 'ember';
import { RECEIPT_TYPE } from '../../../models/receipt-type';

export default Ember.Controller.extend({

  sortByTime: ['dateTime:desc'],

  orderTypeFilter: 'All',

  orderTypes: ['All', 'Delivery', 'Takeaway'],

  ordersToDisplay: Ember.A([]),

  filteredOrders: Ember.observer('orderTypeFilter', function() {
    let orderTypeFilter = this.get('orderTypeFilter');

    if (orderTypeFilter === 'Delivery') {
      this.set('ordersToDisplay', this.get('deliveryOrders'));
      return;
    }
    if (orderTypeFilter === 'Takeaway') {
      this.set('ordersToDisplay', this.get('takeawayOrders'));
      return;
    }
    this.set('ordersToDisplay', this.get('model'));
  }),

  deliveryOrders: Ember.computed.filter('model', function(order) {
    let modelName = order.get('customer.constructor.modelName') || order.get('customer.content.constructor.modelName');
    return modelName === 'delivery-customer';
  }),

  takeawayOrders: Ember.computed.filter('model', function(order) {
    let modelName = order.get('customer.constructor.modelName') || order.get('customer.content.constructor.modelName');
    return modelName === 'takeaway-customer';
  }),

  ordersSortedByTimestamp: Ember.computed.sort('ordersToDisplay', 'sortByTime'),

  cashOrders: Ember.computed.filterBy('ordersToDisplay', 'paymentMethod', 'CASH'),

  cardOrders: Ember.computed.filterBy('ordersToDisplay', 'paymentMethod', 'CARD'),

  onlineOrders: Ember.computed.filterBy('ordersToDisplay', 'paymentMethod', 'ONLINE'),

  notPaidOrders: Ember.computed.filterBy('ordersToDisplay', 'paymentMethod', null),

  totalCash: Ember.computed('cashOrders', function() {
    return this._calculateTotalsFor('cashOrders');
  }),

  totalCard: Ember.computed('cardOrders', function() {
    return this._calculateTotalsFor('cardOrders');
  }),

  totalOnline: Ember.computed('onlineOrders', function() {
    return this._calculateTotalsFor('onlineOrders');
  }),

  totalNotPaid: Ember.computed('notPaidOrders', function() {
    return this._calculateTotalsFor('notPaidOrders');
  }),

  totalAll: Ember.computed('ordersToDisplay', function() {
    return this._calculateTotalsFor('ordersToDisplay');
  }),

  _calculateTotalsFor(propertyName) {
    let orders = this.get(propertyName);
    return orders.reduce((prev, order) => prev + order.get('total'), 0);
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

  actions: {

    /**
     * @param {number} id - id of order to print
     * @param {RECEIPT_TYPE} receiptType - receipt type for printing
     */
    printOrder(id, orderType, receiptType) {
      let url = [this._getNamespace(), orderType, receiptType || RECEIPT_TYPE.EAT_IN, id].join('/');
      this._getRequest(url, 'Printing receipt', 'Order printed successfully', 'Order failed to print');
    },

    printOrderSummary() {
      let url = [this._getNamespace(), 'order-summary'].join('/');
      this._getRequest(url, 'Printing summary', 'Summary printed successfully', 'Summary failed to print');
    },

    editOrder(orderId) {
      this.transitionToRoute('order.edit.eat-out', orderId);
    },

    setOrderTypeFilter(orderType) {
      this.set('orderTypeFilter', orderType);
    }

  }
});
