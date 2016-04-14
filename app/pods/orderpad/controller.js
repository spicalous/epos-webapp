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
   * @type {null|string}
   */
  paymentMethods: [null, 'CASH', 'CARD', 'ONLINE'],

  /**
   * @type {number}
   */
  estimatedDeliveryTimes: [20, 25, 30, 35, 40, 45, 50, 55, 60, 70],

  /**
   * computes the estimated time for delivery
   */
  computedEstimate: Ember.computed('model.order.estimatedTime', function() {
    return new Date(Date.now() + (this.get('model.order.estimatedTime') * 1000 * 60));
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

    setCustomer(customer) {
      this.send('removeCustomer');
      this.set('customer', customer);
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
      let _this = this;
      let customer = this.get('customer');

      this.send('showMessage', 'loader', { message: 'Saving customer..' });

      customer.save().then(function() {
        _this.send('dismissMessage', 'loader');
        _this.send('hideCustomerBrowser');
        _this.send('showMessage', 'toast', {
          body: 'Customer saved successfully'
        });
      }).catch(function(response) {
        _this.send('dismissMessage', 'loader');
        _this.send('showMessage', 'overlay', {
          header: 'Failed to save :(',
          body: response.errors[0].message
        });
      });
    },

    submitOrder() {
      let _this = this,
          order = this.get('model.order'),
          modalWasOpen = Ember.$('#orderpad-modal').hasClass('in');

      Ember.$('#orderpad-modal').modal('hide');
      this.send('showMessage', 'loader', { message: 'Sending order..' });

      order.set('dateTime', new Date());
      order.set('customer', this.get('customer'));
      order.save().then(function() {
        _this.send('dismissMessage', 'loader');
        _this.send('reset');
        _this.send('showMessage', 'overlay', {
          header: 'Confirmed ^.^',
          body: 'Order submitted successfully',
          callback: function() {
            _this.set('model.order', _this.store.createRecord('order'));
            _this.send('hideConfirmOrder');
          }
        });
      }, function(response) {
        _this.send('dismissMessage', 'loader');
        _this.send('showMessage', 'overlay', {
          header: 'Failed :(',
          body: response.errors[0].message,
          callback: function() {
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
