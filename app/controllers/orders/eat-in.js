import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
import { filterBy, sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { RECEIPT_TYPE } from './../../models/receipt-type';

export default class OrdersEatInController extends Controller {

  @service store;
  @service ui;

  @tracked showNewOrderModal = false;

  sortByTime = ['dateTime:desc'];

  @sort('model', 'sortByTime')
  ordersByTimestamp;

  @filterBy('model', 'paymentMethod', 'CASH')
  cashOrders;

  @filterBy('model', 'paymentMethod', 'CARD')
  cardOrders;

  @filterBy('model', 'paymentMethod', 'ONLINE')
  onlinePaymentOrders;

  @filterBy('model', 'paymentMethod', null)
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

  @computed('model.@each.modifiedTotal')
  get totalAll() {
    return this.model.reduce((prev, order) => prev + order.modifiedTotal, 0);
  }

  @action
  toggleCreateModal() {
    this.showNewOrderModal = !this.showNewOrderModal;
  }

  @action
  onCreateOrder() {
    this.showNewOrderModal = false;
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
