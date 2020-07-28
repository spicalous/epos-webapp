import Controller from '@ember/controller';
import { A } from '@ember/array';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class OrderNewController extends Controller {

  @service ui;

  @action
  clearOrder() {
    this.model.order.set('customer', null);
    this.model.order.set('orderItems', A([]));
    this.model.order.set('paymentMethod', null);
    this.model.order.set('notes', null);
    this.model.order.set('estimatedTime', 45);
    this.ui.showAppOverlay('Order Cancelled');
  }

  @action
  preOrderSubmit() {
    this.model.order.set('dateTime', new Date());
  }

  @action
  newOrder() {
    this.set('model.order', this.store.createRecord('order/eat-out', {
      dateTime: new Date(),
      orderItems: A(),
      paymentMethod: null,
      notes: null,
      customer: null,
      estimatedTime: 45,
    }));
  }
}
