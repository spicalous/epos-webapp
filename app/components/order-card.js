import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { getModelName } from './../helpers/get-model-name';

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

export default class OrderCardComponent extends Component {

  @tracked
  showOrderItems = false;

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


}
