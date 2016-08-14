import Ember from 'ember';
import { RECEIPT_TYPE } from '../../../models/receipt-type';

const filterByCustomerType = (customerType) => Ember.computed.filter('model', function(order) {
  let modelName = order.get('customer.constructor.modelName') || order.get('customer.content.constructor.modelName');
  return modelName === customerType;
});

const calculateTotalFor = (paymentTypeOrders) => Ember.computed(paymentTypeOrders, function() {
  let orders = this.get(paymentTypeOrders);
  return orders.reduce((prev, order) => prev + order.get('total'), 0);
});

export default Ember.Controller.extend({

  sortByTime: ['dateTime:desc'],

  orderTypeFilter: 'All',

  orderTypes: ['All', 'Delivery', 'Takeaway'],

  paymentTypeFilter: 'All',

  paymentTypes: ['All', 'Not paid', 'Cash', 'Card', 'Online'],

  ordersToDisplay: Ember.A([]),

  filteredOrders: Ember.observer('orderTypeFilter', 'paymentTypeFilter', function() {
    let orderTypeFilter = this.get('orderTypeFilter');
    let paymentTypeFilter = this.get('paymentTypeFilter');

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

  ordersSortedByTimestamp: Ember.computed.sort('ordersToDisplay', 'sortByTime'),

  deliveryOrders: filterByCustomerType('delivery-customer'),

  takeawayOrders: filterByCustomerType('takeaway-customer'),

  cashOrders: Ember.computed.filterBy('ordersToDisplay', 'paymentMethod', 'CASH'),

  cardOrders: Ember.computed.filterBy('ordersToDisplay', 'paymentMethod', 'CARD'),

  onlineOrders: Ember.computed.filterBy('ordersToDisplay', 'paymentMethod', 'ONLINE'),

  notPaidOrders: Ember.computed.filterBy('ordersToDisplay', 'paymentMethod', null),

  totalCash: calculateTotalFor('cashOrders'),

  totalCard: calculateTotalFor('cardOrders'),

  totalOnline: calculateTotalFor('onlineOrders'),

  totalNotPaid: calculateTotalFor('notPaidOrders'),

  totalAll: calculateTotalFor('ordersToDisplay'),

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
