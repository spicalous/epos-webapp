import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { getModelName } from './../../helpers/get-model-name';
import { PAYMENT_METHODS } from './../../models/payment-method';
import { inject as service } from '@ember/service';

const DEFAULT_DISPLAY_INFO_TAKE_AWAY = 'TAKE AWAY';
const DEFAULT_DISPLAY_INFO_ONLINE = 'ONLINE ORDER';
const LOOKUP = {
  'customer/delivery': function(customer) { return [customer.address, customer.postcode, customer.telephone]; },
  'customer/take-away': function(customer) { return [customer.name || DEFAULT_DISPLAY_INFO_TAKE_AWAY, customer.telephone]; },
  'customer/online': function(customer) { return [customer.orderId || DEFAULT_DISPLAY_INFO_ONLINE]; }
};
const ICON_CLASS_LOOKUP = {
  'customer/delivery': 'icon-customer-delivery',
  'customer/take-away': 'icon-customer-take-away',
  'customer/online': 'icon-customer-online'
};

export default class OrderEatOutCardComponent extends Component {

  paymentMethods = PAYMENT_METHODS;

  @service ui;

  @tracked showOrderItems = false;

  get customerModelName() {
    return getModelName([this.args.order.get('customer')]);
  }

  get customerIconClass() {
    return ICON_CLASS_LOOKUP[this.customerModelName] || 'icon-customer-unknown';
  }

  get customerInfoArray() {
    let getInfoFn = LOOKUP[this.customerModelName];

    return getInfoFn
      ? getInfoFn(this.args.order.get('customer'))
      : ['Unknown customer type'];
  }

  @action
  toggleShowOrderItems() {
    this.showOrderItems = !this.showOrderItems;
  }

  @action
  addDeliveryCustomerTag(tag) {
    let customer = this.args.order.get('customer');
    customer.get('deliveryCustomerTags').pushObject(tag);
    customer.save()
      .then(() => this.ui.showToast('Added delivery customer tag to customer', 3900))
      .catch(error => {
        customer.get('deliveryCustomerTags').removeObject(tag);
        console.error('Failed to add delivery-customer-tag to customer', error);
        this.ui.showAppOverlay(
          'Failed to add delivery customer tag to customer :(',
          error && error.errors && error.errors[0] && error.errors[0].detail || error.message || 'Unknown error');
      });
  }

  @action
  updatePaymentMethod(paymentMethod) {
    if (this.args.order.get('paymentMethod') !== paymentMethod) {
      this.args.order.set('paymentMethod', paymentMethod);
      this.args.order.save()
        .then(() => this.ui.showToast('Updated payment method', 3000))
        .catch((error) => {
          console.error('Failed to update payment method', error);
          this.args.order.rollbackAttributes();
          this.ui.showToast('Failed to update payment method');
        });
    }
  }

}
