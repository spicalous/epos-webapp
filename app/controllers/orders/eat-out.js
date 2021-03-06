import fetch from 'fetch';
import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
import { sort, intersect, filter, filterBy } from '@ember/object/computed';
import { tracked } from '@glimmer/tracking';
import { getModelName } from 'epos-webapp/helpers/get-model-name';
import { inject as service } from '@ember/service';
import { RECEIPT_TYPE } from 'epos-webapp/models/receipt-type';

function filterByCustomerType(customerType) {
  return function(order) {
    return getModelName([order.customer]) === customerType;
  };
}

const ORDER_TYPE = {
  DELIVERY: 'Delivery',
  TAKEAWAY: 'Takeaway',
  ONLINE: 'Online order'
};

const PAYMENT_TYPE = {
  NOT_PAID: 'Not paid',
  CASH: 'Cash',
  CARD: 'Card',
  ONLINE: 'Online payment'
};

export default class OrdersEatOutController extends Controller {

  orderTypes = [ORDER_TYPE.DELIVERY, ORDER_TYPE.TAKEAWAY, ORDER_TYPE.ONLINE];
  paymentTypes = [PAYMENT_TYPE.NOT_PAID, PAYMENT_TYPE.CASH, PAYMENT_TYPE.CARD, PAYMENT_TYPE.ONLINE];

  @service ui;

  @tracked
  orderTypesToShow = [ORDER_TYPE.DELIVERY, ORDER_TYPE.TAKEAWAY, ORDER_TYPE.ONLINE];

  @tracked
  paymentTypesToShow = [PAYMENT_TYPE.NOT_PAID, PAYMENT_TYPE.CASH, PAYMENT_TYPE.CARD, PAYMENT_TYPE.ONLINE];

  @filter('model.orders', filterByCustomerType('customer/delivery'))
  deliveryOrders;

  @filter('model.orders', filterByCustomerType('customer/take-away'))
  takeawayOrders;

  @filter('model.orders', filterByCustomerType('customer/online'))
  onlineOrders;

  @filterBy('model.orders', 'paymentMethod', 'CASH')
  cashOrders;

  @filterBy('model.orders', 'paymentMethod', 'CARD')
  cardOrders;

  @filterBy('model.orders', 'paymentMethod', 'ONLINE')
  onlinePaymentOrders;

  @filterBy('model.orders', 'paymentMethod', null)
  notPaidOrders;

  @computed('cashOrders.@each.modifiedTotal')
  get totalCash() {
    return this.cashOrders.reduce((prev, order) => prev + order.modifiedTotal, 0);
  }

  @computed('cardOrders.@each.modifiedTotal')
  get totalCard() {
    return this.cardOrders.reduce((prev, order) => prev + order.modifiedTotal, 0);
  }

  @computed('onlinePaymentOrders.@each.modifiedTotal')
  get totalOnlinePayment() {
    return this.onlinePaymentOrders.reduce((prev, order) => prev + order.modifiedTotal, 0);
  }

  @computed('notPaidOrders.@each.modifiedTotal')
  get totalNotPaid() {
    return this.notPaidOrders.reduce((prev, order) => prev + order.modifiedTotal, 0);
  }

  @computed('takeawayOrders.@each.modifiedTotal')
  get totalCustomerTakeawayOrders() {
    return this.takeawayOrders.reduce((prev, order) => prev + order.modifiedTotal, 0);
  }

  @computed('deliveryOrders.@each.modifiedTotal')
  get totalCustomerDeliveryOrders() {
    return this.deliveryOrders.reduce((prev, order) => prev + order.modifiedTotal, 0);
  }

  @computed('onlineOrders.@each.modifiedTotal')
  get totalCustomerOnlineOrders() {
    return this.onlineOrders.reduce((prev, order) => prev + order.modifiedTotal, 0);
  }

  @computed('model.orders.@each.modifiedTotal')
  get totalAll() {
    return this.model.orders.reduce((prev, order) => prev + order.modifiedTotal, 0);
  }

  @computed('orderTypesToShow.[]', 'deliveryOrders.[]', 'takeawayOrders.[]', 'onlineOrders.[]')
  get filteredByOrderType() {
    let result = [];
    this.orderTypesToShow.forEach(orderType => {
      if (orderType === ORDER_TYPE.DELIVERY) {
        result = result = result.concat(this.deliveryOrders);
      }
      if (orderType === ORDER_TYPE.TAKEAWAY) {
        result = result = result.concat(this.takeawayOrders);
      }
      if (orderType === ORDER_TYPE.ONLINE) {
        result = result = result.concat(this.onlineOrders);
      }
    });
    return result;
  }

  @computed('paymentTypesToShow.[]', 'cardOrders.[]', 'cashOrders.[]', 'notPaidOrders.[]', 'onlinePaymentOrders.[]')
  get filteredByPaymentType() {
    let result = [];
    this.paymentTypesToShow.forEach(paymentType => {
      if (paymentType === PAYMENT_TYPE.NOT_PAID) {
        result = result.concat(this.notPaidOrders);
      }
      if (paymentType === PAYMENT_TYPE.CASH) {
        result = result.concat(this.cashOrders);
      }
      if (paymentType === PAYMENT_TYPE.CARD) {
        result = result.concat(this.cardOrders);
      }
      if (paymentType === PAYMENT_TYPE.ONLINE) {
        result = result.concat(this.onlinePaymentOrders);
      }
    });
    return result;
  }

  @intersect('filteredByOrderType', 'filteredByPaymentType')
  filteredOrders;

  sortByTime = ['dateTime:desc'];

  @sort('filteredOrders', 'sortByTime')
  ordersByTimestamp;

  @action
  togglePaymentTypeFilter(paymentType) {
    if (this.paymentTypesToShow.includes(paymentType)) {
      this.paymentTypesToShow.removeObject(paymentType);
    } else {
      this.paymentTypesToShow.addObject(paymentType);
    }
  }

  @action
  toggleOrderTypeFilter(orderType) {
    if (this.orderTypesToShow.includes(orderType)) {
      this.orderTypesToShow.removeObject(orderType);
    } else {
      this.orderTypesToShow.addObject(orderType);
    }
  }

  @action
  printOrder(orderId, orderType, receiptType) {
    let namespace = this.store.adapterFor('application').get('namespace');
    receiptType = receiptType || RECEIPT_TYPE.EAT_IN;

    this.ui.showAppLoader('Printing receipt');

    fetch(`/${namespace}/printer/${orderType}/${receiptType}/${orderId}`)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((responseBody) => {
            throw new Error(extractErrorMessageFromResponse(responseBody));
          });
        }
      })
      .then(() => {
        this.ui.dismissAppLoader();
        this.ui.showAppOverlay('Order printed successfully');
      })
      .catch(error => {
        console.error('Failed to print order', error);
        this.ui.dismissAppLoader();
        this.ui.showAppOverlay('Order failed to print', error.message);
      });
  }
}

function extractErrorMessageFromResponse(response) {
  return response && response.errors && response.errors[0] && response.errors[0].detail
    ? response.errors[0].detail
    : 'Unknown error';
}
