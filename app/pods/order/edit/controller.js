import Ember from 'ember';
import { PAYMENT_METHODS } from '../../../models/payment-method';

export default Ember.Controller.extend({

  /**
   * @type {Category}
   * @see {@link models/category}
   */
  selectedCategory: null,

  /**
   * Used for filtering the menu
   * @type {String}
   */
  numpadValue: '',

  /**
   * An array of menu items filtered by category and number entered by the numpad
   * @type {MenuItem[]}
   */
  menuItems: Ember.computed('model.menu', 'selectedCategory', 'numpadValue', function() {
    const selectedCategory = this.get('selectedCategory');
    const numpadValue = this.get('numpadValue');
    let menuItems = this.get('model.menu');

    if (selectedCategory) {
      menuItems = menuItems.filter((item) =>
        item.get('categories').any((category) => selectedCategory === category));
    }
    if (numpadValue) {
      menuItems = menuItems.filter((item) => item.get('menuId').startsWith(numpadValue));
    }

    return menuItems;
  }),

  /**
   * Menu items sorted by ascending id
   * @type {MenuItem[]}
   */
  sortedMenu: Ember.computed.sort('menuItems', (x, y) => x.get('id') - y.get('id')),

  /**
   * Categories sorted by ascending id
   * @type {Category[]}
   */
  sortedCategories: Ember.computed.sort('model.categories', (x, y) => x.get('id') - y.get('id')),

  /**
   * Whether we should focus the order id field when order customer is selected
   * @type {Boolean}
   */
  focusOrderIdField: true,

  /**
   * @type {String[]}
   */
  paymentMethods: Object.values(PAYMENT_METHODS),

  /**
   * @type {Number[]}
   */
  estimatedTimes: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 75],

  /**
   * Customer payment method
   * @type {null|String}
   */
  paymentMethod: null,

  /**
   * Time in minutes for delivery estimate
   * @type {Number}
   */
  estimatedTime: 45,

  /**
   * Computes the estimated time for delivery
   * @type {Date}
   */
  computedEstimate: Ember.computed('estimatedTime', function() {
    return new Date(Date.now() + (this.get('estimatedTime') * 1000 * 60));
  }),

  /**
   * notes regarding the order
   * @type {null|String}
   */
  notes: null,

  /**
   * @type {OrderItem[]}
   */
  items: Ember.A(),

  total: Ember.computed('items.@each.quantity', 'items.@each.total', function() {
    return this.get('items').reduce((prev, item) => prev + item.get('total'), 0);
  }),

  size: Ember.computed('items.@each.quantity', function() {
    return this.get('items').reduce((prev, item) => prev + item.get('quantity'), 0);
  }),

  /**
   * Only applies to delivery and takeaway customers
   * @type {Boolean}
   */
  validCustomer: Ember.computed('customer', 'customer.invalidTelephone', 'customer.invalidAddress', 'customer.invalidPostcode', function() {
    let customer = this.get('customer');

    return customer && !customer.get('invalidTelephone') &&
        !customer.get('invalidAddress') && !customer.get('invalidPostcode');
  }),

  emptyCustomer: Ember.computed.empty('customer'),

  emptyOrder: Ember.computed.empty('items'),

  emptyCustomerAndOrder: Ember.computed.and('emptyCustomer', 'emptyOrder'),

  invalidOrder: Ember.computed('emptyOrder', 'validCustomer', function() {
    return this.get('emptyOrder') || !this.get('validCustomer');
  }),

  _prepareOrder() {
    // overridden
  },

  _handleSuccessfulSubmit() {
    this.send('dismissMessage', 'loader');
    this.send('showMessage', 'overlay', {
      header: 'Confirmed ^.^',
      body: 'Order submitted successfully',
      callback: () => {

        // TODO: replace with proper solution ID:1829 (use this to search other todos)
        // ### START
        // remove original records from the store that were not replaced by
        // side loaded response see https://github.com/emberjs/data/issues/1829
        this.store.peekAll('order-item').filterBy('isNew').invoke('unloadRecord');
        this.store.peekAll('takeaway-customer').filterBy('isNew').invoke('unloadRecord');
        // ### END

        this.send('toggleConfirmOrder');
        this.send('reset');
        if (this.get('onSubmitOrder')) {
          this.get('onSubmitOrder').call(this);
        }
      }
    });
  },

  _handleFailedSubmit(response) {
    this.send('dismissMessage', 'loader');
    this.send('showMessage', 'overlay', {
      header: 'Failed :(',
      body: response.errors[0].message
    });
  },

  actions: {

    selectCategory(category) {
      this.set('selectedCategory', this.get('selectedCategory') === category ? null : category);
    },

    addMenuItem(menuItem) {
      let items = this.get('items');

      let orderItem = items.any(function(item) {
        if (item.isMenuItem(menuItem) && item.hasNoEditOptions()) {
          return item;
        }
      });

      if (orderItem) {
        orderItem.incrementProperty('quantity');
      } else {
        items.pushObject(this.get('store').createRecord('order-item', {
          quantity: 1,
          menuItem: menuItem
        }));
      }

      this.set('numpadValue', '');
      this.send('showToast', 'Added ' + menuItem.get('name'));
    },

    decrementOrderItem(orderItem) {
      if (1 < orderItem.get('quantity')) {
        orderItem.decrementProperty('quantity');
      } else {
        orderItem.deleteRecord();
        this.get('items').removeObject(orderItem);
      }
    },

    onNumpadValueChange(value) {
      this.set('numpadValue', value);
    },

    setNewTakeawayCustomer() {
      this.set('customer', this.store.createRecord('takeaway-customer'));
      this.set('estimatedTime', 30);
    },

    setNewOnlineCustomer() {
      this.set('customer', this.store.createRecord('online-customer'));
      this.set('paymentMethod', PAYMENT_METHODS.ONLINE);
      this.set('estimatedTime', 15);
    },

    selectDeliveryCustomer(customer) {
      this.set('customer', customer);
      this.toggleProperty('showCustomerSelect');
    },

    saveAndSelectDeliveryCustomer() {
      let customer = this.get('customer');

      this.send('showMessage', 'loader', { message: 'Saving customer..' });

      customer.save().then(() => {
        this.send('dismissMessage', 'loader');
        this.set('showCustomerSelect', false);
        this.send('showToast', 'Customer saved successfully');
      }).catch((response) => {
        this.send('dismissMessage', 'loader');
        this.send('showMessage', 'overlay', {
          header: 'Failed to save :(',
          body: response.errors[0].message
        });
      });
    },

    removeCustomer() {
      this.set('customer', null);
      this.set('paymentMethod', null);
      this.set('estimatedTime', 45);
    },

    toggleCustomerSelect() {
      if (this.get('showCustomerSelect')) {
        this.set('customer', null);
      } else {
        this.set('customer', this.store.createRecord('delivery-customer'));
      }
      this.toggleProperty('showCustomerSelect');
    },

    toggleOrderModal() {
      this.toggleProperty('showOrderModal');
    },

    confirmCancelOrder() {
      this.send('showMessage', 'confirm', {
        title: "Cancel order",
        message: "Are you sure you want to cancel?",
        confirm: () => this.send('cancelOrder')
      });
    },

    toggleConfirmOrder() {
      this.toggleProperty('showConfirmOrder');
    },

    cancelOrder() {
      this.send('reset');
      this.send('showMessage', 'overlay', {
        header: 'Order Cancelled',
        callback: this.get('onCancelOrder') ? this.get('onCancelOrder').bind(this) : () => {}
      });
    },

    submitOrder() {
      let order = this._prepareOrder.call(this);

      this.send('showMessage', 'loader', { message: 'Sending order..' });
      order.save().then(this._handleSuccessfulSubmit.bind(this), this._handleFailedSubmit.bind(this));
    },

    back() {
      this.send('reset');
      this.transitionToRoute('index');
    },

    reset() {
      this.send('removeCustomer');
      this.set('showOrderModal', false);
      this.set('notes', null);
      this.set('items', Ember.A([]));
      this.set('deletedItems', Ember.A([]));
      this.set('paymentMethod', null);
      this.set('estimatedTime', 45);
      this.set('numpadValue', '');
      this.set('selectedCategory', null);
    }

  }
});
