import Ember from 'ember';
import { PAYMENT_METHODS } from '../../../models/payment-method';

export default Ember.Controller.extend({

  orderService: Ember.inject.service('order'),

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
   * Only applies to delivery and takeaway customers
   * @type {Boolean}
   */
  validCustomer: Ember.computed('customer', 'customer.invalidTelephone', 'customer.invalidAddress', 'customer.invalidPostcode', function() {
    let customer = this.get('customer');

    return customer && !customer.get('invalidTelephone') &&
        !customer.get('invalidAddress') && !customer.get('invalidPostcode');
  }),

  emptyCustomer: Ember.computed.empty('customer'),

  emptyOrder: Ember.computed.empty('orderService.items'),

  emptyCustomerAndOrder: Ember.computed.and('emptyCustomer', 'emptyOrder'),

  invalidOrder: Ember.computed('emptyOrder', 'validCustomer', function() {
    return this.get('emptyOrder') || !this.get('validCustomer');
  }),

  createEatOutOrder() {
    return this.store.createRecord('order/eatOut', {
      dateTime: new Date(),
      orderItems: this.get('orderService.items'),
      paymentMethod: this.get('paymentMethod'),
      notes: this.get('notes'),
      customer: this.get('customer'),
      estimatedTime: this.get('estimatedTime'),
    });
  },

  actions: {

    selectCategory(category) {
      this.set('selectedCategory', this.get('selectedCategory') === category ? null : category);
    },

    addMenuItem(menuItem) {
      this.get('orderService').add(menuItem);
      this.set('numpadValue', '');
      this.send('showToast', 'Added ' + menuItem.get('name'));
    },

    decrementOrderItem(orderItem) {
      this.get('orderService').decrement(orderItem);
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
      this.send('showMessage', 'overlay', { header: 'Order Cancelled' });
    },

    submitOrder() {
      let order = this.createEatOutOrder();

      this.send('showMessage', 'loader', { message: 'Sending order..' });

      order.save().then(() => {
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
          }
        });

      }, (response) => {
        this.send('dismissMessage', 'loader');
        this.send('showMessage', 'overlay', {
          header: 'Failed :(',
          body: response.errors[0].message
        });
      });
    },

    reset() {
      this.send('removeCustomer');
      this.set('showOrderModal', false);
      this.get('orderService').clear();
      this.set('notes', null);
      this.set('paymentMethod', null);
      this.set('estimatedTime', 45);
      this.set('numpadValue', '');
      this.set('selectedCategory', null);
    }

  }
});
