import Ember from 'ember';
import config from '../../config/environment';

export default Ember.Controller.extend({

  featureFlags: {
    NAV_BAR_ENABLED: config.APP.NAV_BAR_ENABLED
  },

  /**
   * @type {Customer}
   * @see {@link models/customer}
   */
  customer: null,

  /**
   * @type {Category}
   * @see {@link models/category}
   */
  selectedCategory: null,

  /**
   * used for filtering the menu
   * @type {string}
   */
  numpadValue: '',

  /**
   * boolean dependant on the visibility of the customer browser
   * @type {boolean}
   */
  showCustomerBrowser: false,

  /**
   * @type {Array[]}
   */
  paymentMethods: [null, 'CASH', 'CARD', 'ONLINE'],

  /**
   * @type {Number[]}
   */
  estimatedTimes: [20, 25, 30, 35, 40, 45, 50, 55, 60, 70],

  estimatedTime: 45,

  /**
   * @type {MenuItem[]}
   * menu items sorted by ascending id
   */
  sortedMenu: Ember.computed.sort('model.menu', (x, y) => x.get('id') - y.get('id')),

  /**
   * computes the estimated time for delivery
   */
  computedEstimate: Ember.computed('estimatedTime', function() {
    return new Date(Date.now() + (this.get('estimatedTime') * 1000 * 60));
  }),

  validCustomer: Ember.computed('customer', 'customer.invalidTelephone',
      'customer.invalidAddress', 'customer.invalidPostcode', function() {

    let customer = this.get('customer');

    if (!customer) {
      return false;
    }
    return customer.get('customerType') === 'takeaway-customer' ?
      !customer.get('invalidTelephone') :
      !customer.get('invalidTelephone') && !customer.get('invalidAddress') && !customer.get('invalidPostcode');
  }),

  emptyCustomer: Ember.computed.empty('customer'),

  cannotCancelOrder: Ember.computed.and('emptyCustomer', 'emptyOrder'),

  emptyOrder: Ember.computed.empty('model.order.orderItems'),

  invalidCustomer: Ember.computed.not('validCustomer'),

  invalidOrder: Ember.computed.or('emptyOrder', 'invalidCustomer'),

  actions: {

    selectMenuCategory(category) {
      let selectedCategory = this.get('selectedCategory');
      this.set('selectedCategory', selectedCategory === category ? null : category);
    },

    addMenuItem(menuItem) {
      this.get('model.order').addItem(menuItem);
      this.set('numpadValue', '');

      this.send('showMessage', 'toast', {
        body: 'Added ' + menuItem.get('name')
      });
    },

    createCustomer(type) {
      let customer = this.store.createRecord(type);
      this.set('customer', customer);

      if (type === 'delivery-customer') {
        this.send('showCustomerBrowser');
      }
    },

    removeCustomer() {
      let customer = this.get('customer');

      if (customer && customer.get('id') === null) {
        customer.destroyRecord();
      }
      this.set('customer', null);
    },

    showCustomerBrowser() {
      this.set('showCustomerBrowser', true);
    },

    hideCustomerBrowser() {
      this.set('showCustomerBrowser', false);
    },

    cancelCustomerBrowser() {
      this.send('removeCustomer');
      this.set('showCustomerBrowser', false);
    },

    selectCustomer(deliveryCustomer) {
      this.send('hideCustomerBrowser');
      this.send('removeCustomer');
      this.set('customer', deliveryCustomer);
    },

    saveAndSelectCustomer() {
      let customer = this.get('customer');

      this.send('showMessage', 'loader', { message: 'Saving customer..' });

      customer.save().then(() => {
        this.send('dismissMessage', 'loader');
        this.send('hideCustomerBrowser');
        this.send('showMessage', 'toast', {
          body: 'Customer saved successfully'
        });
      }).catch((response) => {
        this.send('dismissMessage', 'loader');
        this.send('showMessage', 'overlay', {
          header: 'Failed to save :(',
          body: response.errors[0].message
        });
      });
    },

    submitOrder() {
      let baseOrder = this.get('model.order');
      let order = this.store.createRecord('order/eatOut', {
        dateTime: new Date(),
        customer: this.get('customer'),
        estimatedTime: this.get('estimatedTime'),
        orderItems: baseOrder.get('orderItems'),
        paymentMethod: baseOrder.get('paymentMethod'),
        notes: baseOrder.get('notes'),
      });

      let modalWasOpen = Ember.$('#orderpad-modal').hasClass('in');

      Ember.$('#orderpad-modal').modal('hide');
      this.send('showMessage', 'loader', { message: 'Sending order..' });

      order.save().then(() => {
        this.send('dismissMessage', 'loader');
        this.send('reset');
        this.send('showMessage', 'overlay', {
          header: 'Confirmed ^.^',
          body: 'Order submitted successfully',
          callback: () => {
            this.set('model.order', this.store.createRecord('order'));
            this.send('hideConfirmOrder');
          }
        });

        // TODO: work around to remove order items with null ids from the store after
        //       being saved
        this.store.peekAll('order-item').filterBy('id', null).invoke('destroyRecord');

      }, (response) => {
        this.send('dismissMessage', 'loader');
        this.send('showMessage', 'overlay', {
          header: 'Failed :(',
          body: response.errors[0].message,
          callback: () => {
            if (modalWasOpen) {
              Ember.$('#orderpad-modal').modal('show');
            }
          }
        });
      });
    },

    cancelOrder() {
      this.send('reset');
      this.get('model.order').destroyRecord();
      this.set('model.order', this.store.createRecord('order'));
      this.send('showMessage', 'overlay', {
        header: 'Order Cancelled'
      });
    },

    reset() {
      this.send('removeCustomer');
      this.set('selectedCategory', '');
      this.set('numpadValue', '');
      this.set('deliveryCustomerResults', '');
      Ember.$('#orderpad-modal').modal('hide');
    }
  }
});
