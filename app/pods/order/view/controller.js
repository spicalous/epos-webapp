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

  orderTypes: ['All', 'Delivery', 'Takeaway', 'Online'],

  paymentTypeFilter: 'All',

  paymentTypes: ['All', 'Not paid', 'Cash', 'Card', 'Online'],

  filteredOrders: Ember.computed.intersect('filteredByOrderType', 'filteredByPaymentType'),

  filteredByOrderType: Ember.computed('orderTypeFilter', 'model.[]', function() {
    let orderTypeFilter = this.get('orderTypeFilter');

    if (orderTypeFilter === 'Delivery') {
      return this.get('deliveryOrders');
    } else if (orderTypeFilter === 'Takeaway') {
      return this.get('takeawayOrders');
    } else if (orderTypeFilter === 'Online') {
      return this.get('onlineOrders');
    } else {
      return this.get('model').toArray();
    }
  }),

  filteredByPaymentType: Ember.computed('paymentTypeFilter', 'model.@each.paymentMethod', function() {
    let paymentTypeFilter = this.get('paymentTypeFilter');

    if (paymentTypeFilter === 'Not paid') {
      return this.get('notPaidOrders');
    } else if (paymentTypeFilter === 'Cash') {
      return this.get('cashOrders');
    } else if (paymentTypeFilter === 'Card') {
      return this.get('cardOrders');
    } else if (paymentTypeFilter === 'Online') {
      return this.get('onlinePaymentOrders');
    } else {
      return this.get('model').toArray();
    }
  }),

  ordersSortedByTimestamp: Ember.computed.sort('filteredOrders', 'sortByTime'),

  deliveryOrders: filterByCustomerType('delivery-customer'),
  takeawayOrders: filterByCustomerType('takeaway-customer'),
  onlineOrders: filterByCustomerType('online-customer'),

  cashOrders: Ember.computed.filterBy('model', 'paymentMethod', 'CASH'),
  cardOrders: Ember.computed.filterBy('model', 'paymentMethod', 'CARD'),
  onlinePaymentOrders: Ember.computed.filterBy('model', 'paymentMethod', 'ONLINE'),
  notPaidOrders: Ember.computed.filterBy('model', 'paymentMethod', null),

  totalCash: calculateTotalFor('cashOrders'),
  totalCard: calculateTotalFor('cardOrders'),
  totalOnline: calculateTotalFor('onlinePaymentOrders'),
  totalNotPaid: calculateTotalFor('notPaidOrders'),
  totalAll: calculateTotalFor('model'),

  numberOfCashOrders: Ember.computed('cashOrders.length', function() {
    return this.get('cashOrders.length');
  }),
  numberOfCardOrders: Ember.computed('cardOrders.length', function() {
    return this.get('cardOrders.length');
  }),
  numberOfOnlineOrders: Ember.computed('onlinePaymentOrders.length', function() {
    return this.get('onlinePaymentOrders.length');
  }),
  numberOfNotPaidOrders: Ember.computed('notPaidOrders.length', function() {
    return this.get('notPaidOrders.length');
  }),
  numberOfTotalOrders: Ember.computed('model.length', function() {
    return this.get('model.length');
  }),

  _getNamespace() {
    let namespace = this.store.adapterFor('application').get('namespace');
    return '/' + [namespace, 'printer'].join('/');
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
    },

    setPaymentTypeFilter(paymentFilter) {
      this.set('paymentTypeFilter', paymentFilter);
    }

  }
});
