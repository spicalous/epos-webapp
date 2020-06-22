import Component from '@glimmer/component';
import { getModelName } from './../../helpers/get-model-name';

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

export default class OrderListCustomerComponent extends Component {

  get customerModelName() {
    return getModelName([this.args.customer]);
  }

  get customerIconClass() {
    return ICON_CLASS_LOOKUP[this.customerModelName] || 'icon-customer-unknown';
  }

  get customerInfoArray() {
    let getInfoFn = LOOKUP[this.customerModelName];

    return getInfoFn
      ? getInfoFn(this.args.customer)
      : ['Unknown customer type'];
  }
}
