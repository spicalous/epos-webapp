import Controller from '@ember/controller';
import { A } from '@ember/array';
import { action, computed } from '@ember/object';
import {  sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class OrdersEatInController extends Controller {

  @service store;
  @service ui;

  @tracked showOrderConfirmModal = false;
  @tracked newTableName = '';
  @tracked newNumberOfGuests = '';

  sortByTime = ['dateTime:desc'];

  @sort('model', 'sortByTime')
  ordersByTimestamp;

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
        this.newTableName = '';
      })
      .catch(error => {
        console.error('Failed to create order/eat-in', error);
        this.ui.showAppOverlay('Failed to create table :(');
        record.unloadRecord();
      });
  }
}
