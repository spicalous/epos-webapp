import Controller from '@ember/controller';
import { A } from '@ember/array';
import { action, computed } from '@ember/object';
import { filterBy, sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { RECEIPT_TYPE } from './../../models/receipt-type';

const DEFAULT_TABLE_NAME = 'Table ';

export default class OrdersEatInController extends Controller {

  @service store;
  @service ui;

  @tracked showOrderConfirmModal = false;
  @tracked newTableName = DEFAULT_TABLE_NAME;
  @tracked newNumberOfGuests = '';

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

  @computed('cashOrders.@each.total')
  get totalCash() {
    return this.cashOrders.reduce((prev, order) => prev + order.total, 0);
  }

  @computed('cardOrders.@each.total')
  get totalCard() {
    return this.cardOrders.reduce((prev, order) => prev + order.total, 0);
  }

  @computed('onlinePaymentOrders.@each.total')
  get totalOnlinePayment() {
    return this.onlinePaymentOrders.reduce((prev, order) => prev + order.total, 0);
  }

  @computed('notPaidOrders.@each.total')
  get totalNotPaid() {
    return this.notPaidOrders.reduce((prev, order) => prev + order.total, 0);
  }

  @computed('model.@each.total')
  get totalAll() {
    return this.model.reduce((prev, order) => prev + order.total, 0);
  }

  @computed('newTableName', 'newNumberOfGuests')
  get canCreate() {
    if (this.newNumberOfGuests) {
      let numerical = Number(this.newNumberOfGuests.trim());
      return this.newTableName && !Number.isNaN(numerical) && numerical > 0;
    }
    return this.newTableName;
  }

  @action
  toggleCreateModal() {
    this.showOrderConfirmModal = !this.showOrderConfirmModal;
  }

  @action
  createOrder() {
    this.showOrderConfirmModal = false;
    let record = this.store.createRecord('order/eat-in', {
      dateTime: new Date(),
      orderItems: A(),
      tableName: this.newTableName,
      numberOfGuests: this.newNumberOfGuests
    });

    record.save()
      .then(() => {
        this.newTableName = DEFAULT_TABLE_NAME;
        this.newNumberOfGuests = '';
      })
      .catch(error => {
        console.error('Failed to create order/eat-in', error);
        this.ui.showAppOverlay('Failed to create table :(');
        record.unloadRecord();
      });
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
