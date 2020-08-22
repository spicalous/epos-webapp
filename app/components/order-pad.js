import Component from '@glimmer/component';
import { action, computed } from '@ember/object';
import { and, empty, sort } from '@ember/object/computed';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { getModelName } from 'epos-webapp/helpers/get-model-name';
import { validate as validateDelivery } from 'epos-webapp/models/customer/delivery';
import { validate as validateOnline } from 'epos-webapp/models/customer/online';
import { validate as validateTakeaway } from 'epos-webapp/models/customer/take-away';
import { PAYMENT_METHODS } from 'epos-webapp/models/payment-method';
import { MODIFIER_TYPES } from 'epos-webapp/models/order-modifier';
import { cancel, debounce } from '@ember/runloop';

const VALIDATE_CUSTOMER_FN_MAP = {
  'customer/delivery': function(customer) {
    return validateDelivery(customer.get('telephone'), customer.get('addressOne'), customer.get('road'), customer.get('postcode'));
  },
  'customer/online': function(customer) {
    return validateOnline(customer.get('telephone'));
  },
  'customer/take-away': function(customer) {
    return validateTakeaway(customer.get('telephone'));
  }
};

function resizeHandler() {
  if (575 < window.innerWidth && this.showOrder) {
    this.showOrder = false;
  }
}

export default class OrderPadComponent extends Component {

  @service store;
  @service ui;

  @tracked selectedCategoryId = null;
  @tracked numpadValue = '';
  @tracked showDeliverySelect = false;
  @tracked showOrder = false;
  @tracked showOrderConfirmModal = false;
  @tracked print = false;
  @tracked showApplyOrderModifierModal = false;

  paymentMethods = Object.keys(PAYMENT_METHODS);
  estimatedTimes = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 75];

  constructor() {
    super(...arguments);
    this.boundOnWindowResize = this._onWindowResize.bind(this);
    window.addEventListener('resize', this.boundOnWindowResize);
  }

  willDestroy() {
    cancel(this._resizeTimer);
    window.removeEventListener('resize', this.boundOnWindowResize);
    super.willDestroy(...arguments);
  }

  _onWindowResize() {
    this._resizeTimer = debounce(this, resizeHandler, 200);
  }

  @computed('args.menuItems', 'selectedCategoryId', 'numpadValue')
  get filteredMenuItems() {
    let menuItems = this.args.menuItems;

    if (this.selectedCategoryId !== null) {
      menuItems = menuItems.filter(item => item.categories.any(category => category.id === this.selectedCategoryId));
    }
    if (this.numpadValue) {
      menuItems = menuItems.filter(item => item.menuId.startsWith(this.numpadValue));
    }
    return menuItems;
  }

  @sort('args.categories', (x, y) => x.id - y.id)
  sortedCategories;

  @sort('filteredMenuItems', (x, y) => x.id - y.id)
  sortedMenuItems;

  @computed('args.order.orderItems.{@each.quantity,@each.total}')
  get orderItemQuantitySum() {
    return this.args.order.get('orderItems').reduce((prev, item) => prev + item.get('quantity'), 0);
  }

  @computed('args.order.paymentMethod')
  get selectedPaymentMethod() {
    return this.args.order.get('paymentMethod') || 'NOT PAID';
  }

  @computed('args.order')
  get isEatInOrder() {
    return getModelName([this.args.order]) === 'order/eat-in';
  }

  @computed('isEatInOrder', 'args.order.customer')
  get noCustomer() {
    return !this.isEatInOrder && !this.args.order.customer;
  }

  @empty('args.order.orderItems') noOrderItems;
  @and('noCustomer', 'noOrderItems') emptyOrderPad;

  @computed('isEatInOrder', 'args.order.customer.{telephone,addressOne,road,postcode}')
  get validCustomer() {
    if (this.isEatInOrder) {
      return true;
    }

    let modelName = getModelName([this.args.order.get('customer')]);
    let validateFn = VALIDATE_CUSTOMER_FN_MAP[modelName];

    if (!modelName || !validateFn) {
      return false;
    }

    return !validateFn(this.args.order.get('customer'));
  }

  @computed('noCustomer', 'noOrderItems', 'validCustomer')
  get invalidOrder() {
    return this.noCustomer
      || this.noOrderItems
      || !this.validCustomer;
  }

  @computed('args.order.estimatedTime')
  get estimatedTime() {
    return new Date(Date.now() + (this.args.order.estimatedTime * 1000 * 60));
  }

  @computed('args.order.{orderModifier,modifiedTotal,total}', )
  get orderTotal() {
    return this.args.order.orderModifier
      ? this.args.order.modifiedTotal
      : this.args.order.total;
  }

  @action
  setSelectedCategory(categoryId) {
    this.selectedCategoryId = this.selectedCategoryId === categoryId ? null : categoryId;
  }

  @action
  onNumpadValueChange(value) {
    this.numpadValue = value;
  }

  @action
  addMenuItemToOrder(menuItem) {
    let orderItems = this.args.order.get('orderItems');
    let matchingOrderItem = orderItems.find((item) => item.isMenuItem(menuItem) && item.hasNoEditOptions());

    if (matchingOrderItem) {
      matchingOrderItem.incrementProperty('quantity');
    } else {
      orderItems.pushObject(this.store.createRecord('order-item', { quantity: 1, menuItem }));
    }

    this.numpadValue = '';
    this.ui.showToast(`Added ${menuItem.get('name')}`);
  }

  @action
  decrementOrderItem(orderItem) {
    if (1 < orderItem.get('quantity')) {
      orderItem.decrementProperty('quantity');
    } else {
      orderItem.deleteRecord();
      this.args.order.get('orderItems').removeObject(orderItem);
    }
  }

  @action
  onShowOrder() {
    this.showOrder = true;
  }

  @action
  onHideOrder() {
    this.showOrder = false;
  }

  @action
  showDeliveryCustomerSelect() {
    this.showDeliverySelect = true;
  }

  @action
  cancelDeliveryCustomerSelect() {
    this.showDeliverySelect = false;
  }

  @action
  setNewTakeAwayCustomer() {
    this.args.order.set('customer', this.store.createRecord('customer/take-away'));
    this.args.order.set('estimatedTime', 30);
  }

  @action
  saveNewDeliveryCustomer(customerData) {
    let customer = this.store.createRecord('customer/delivery', customerData);

    this.ui.showAppLoader('Saving customer...');

    customer.save()
      .then(() => {
        this.ui.dismissAppLoader();
        this.setDeliveryCustomer(customer);
      })
      .catch(error => {
        console.error('Failed to save customer', error);
        this.ui.dismissAppLoader();
        this.ui.showAppOverlay(
          'Failed to save customer :(',
          error && error.errors && error.errors[0] && error.errors[0].detail || error.message || 'Unknown error');
      });
  }

  @action
  setDeliveryCustomer(deliveryCustomer) {
    this.args.order.set('customer', deliveryCustomer);
    this.showDeliverySelect = false;
  }

  @action
  setNewOnlineCustomer() {
    this.args.order.set('customer', this.store.createRecord('customer/online'));
    this.args.order.set('paymentMethod', PAYMENT_METHODS.ONLINE);
    this.args.order.set('estimatedTime', 15);
  }

  @action
  removeCustomer() {
    this.args.order.set('customer', null);
    this.args.order.set('paymentMethod', null);
    this.args.order.set('estimatedTime', 45);
  }

  @action
  onEstimatedTimeSelect(event) {
    this.args.order.set('estimatedTime', event.target.value);
  }

  @action
  onPaymentMethodSelect(event) {
    this.args.order.set('paymentMethod', PAYMENT_METHODS[event.target.value]);
  }

  @action
  cancelOrder() {
    this.selectedCategoryId = null;
    this.numpadValue = '';
    this.args.onCancelOrder();
  }

  @action
  toggleConfirmOrder() {
    this.showOrderConfirmModal = !this.showOrderConfirmModal;
  }

  @action
  togglePrint(event) {
    this.print = !this.print;
    event.preventDefault();
  }

  @action
  toggleApplyOrderModifierDialog() {
    this.showApplyOrderModifierModal = !this.showApplyOrderModifierModal;
  }

  @action
  async onApplyOrderModifier(type, value) {
    this.showApplyOrderModifierModal = false;
    this.args.order.set('orderModifier', this.store.createRecord('order-modifier', {
      type,
      value: type === MODIFIER_TYPES.ABSOLUTE ? value * 100 : value
    }));
  }

  @action
  async removeDiscount() {
    let orderModifier = await this.args.order.orderModifier;
    orderModifier.deleteRecord();
    orderModifier.unloadRecord();
    this.args.order.orderModifier = null;
  }

  @action
  submitOrder() {
    this.toggleConfirmOrder();
    this.ui.showAppLoader('Submitting order..');
    if (this.args.preOrderSubmit) {
      this.args.preOrderSubmit();
    }
    this.args.order.save({ adapterOptions: { print: this.print }})
      .then(() => {
        // These are embedded records that we send to the server with POST order request.
        // Ember doesn't have a way to match embedded records from the request with server response.
        // This means that when these records are loaded again from the server in /orders page with ids, they will
        // be regarded as different to the records in the ember data store with no ids, resulting in duplicate items.
        this.store.peekAll('order-item').filterBy('isNew').invoke('unloadRecord');
        this.store.peekAll('customer/take-away').filterBy('isNew').invoke('unloadRecord');
        this.store.peekAll('customer/online').filterBy('isNew').invoke('unloadRecord');

        this.ui.dismissAppLoader();
        this.ui.showAppOverlay(
          'Confirmed ^.^',
          'Order submitted successfully',
          () => {
            this.selectedCategoryId = null;
            this.numpadValue = '';
            this.args.onOrderSubmitted();
          });
      })
      .catch(error => {
        this.ui.dismissAppLoader();
        this.ui.showAppOverlay(
          'Failed to submit order :(',
          error && error.errors && error.errors[0] && error.errors[0].detail || error.message || 'Unknown error');
      });
  }
}
