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
  customerBrowserVisible: false,

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

  canSaveCustomer: Ember.computed('validCustomer', 'emptySearchResults', 'debouncedSearch', function() {
    return this.get('validCustomer') && this.get('emptySearchResults') && !this.get('debouncedSearch');
  }),

  emptySearchResults: Ember.computed.empty('deliveryCustomerResults'),

  hasCustomerQuery: Ember.computed('customer.telephone', 'customer.addressOne', 'customer.addressTwo', 'customer.postcode', function() {
    return (this.get('customer.telephone') && this.get('customer.telephone').length > 2) ||
           (this.get('customer.addressOne') && this.get('customer.addressOne').length > 2) ||
           (this.get('customer.addressTwo') && this.get('customer.addressTwo').length > 2) ||
           (this.get('customer.postcode') && this.get('customer.postcode').length > 2);
  }),

  invalidOrder: Ember.computed('emptyOrder', 'validCustomer', function() {
    return this.get('emptyOrder') || !this.get('validCustomer');
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

  cannotCancelOrder: Ember.computed('customer', 'emptyOrder', function() {
    return this.get('emptyOrder') && !this.get('customer');
  }),

  emptyOrder: Ember.computed('model.order.size', function() {
    return this.get('model.order.size') > 0 ? false : true;
  }),

  /**
   * @param {HTMLElement} dropdownTrigger  - element responsible for triggering the
   *                                         bootstrap dropdown for suggestion
   * @param {string} debounceId            - id for debounce handling
   * @param {string} model                 - model name for query
   * @param {object} query                 - query params
   * @param {function} valid               - execute search if valid() evaluates true
   * @param {string} blockingFlag          - if this property on the controller is true
   *                                         then don't search and set flag to false
   */
  suggestionSearch(dropdownTrigger, debounceId, model, query, valid, blockingFlag) {
    let _this = this;

    Ember.run.cancel(this.get(debounceId));

    if (!this.get('customerBrowserVisible')) {
      return;
    }
    if (this.get(blockingFlag)) {
      this.set(blockingFlag, false);
      return;
    }

    if (valid()) {

      this.set(debounceId, Ember.run.debounce(this, function() {

        this.store.query(model, query).then(function(roads) {
          _this.set(debounceId, '');
          _this.set(model + 'Suggestions', roads);
          _this.set(model + 'SuggestionError', false);
          if (!dropdownTrigger.parent().hasClass('open')) {
            dropdownTrigger.dropdown('toggle');
          }
        }).catch(function() {
          _this.set(debounceId, '');
          _this.set(model + 'Suggestions', []);
          _this.set(model + 'SuggestionError', true);
          if (!dropdownTrigger.parent().hasClass('open')) {
            dropdownTrigger.dropdown('toggle');
          }
        });

      }, 500));
    } else {
      dropdownTrigger.parent().removeClass('open');
    }
  },

  roadSuggestionSearch: Ember.observer('customer', 'customer.addressTwo', function() {
    const trigger = Ember.$('#addressSuggestionDropdownTrigger');
    const debounceId = 'debouncedAddressTwoSuggestion';
    let addressTwo = this.get('customer.addressTwo');

    this.suggestionSearch(trigger, debounceId, 'road', { road: addressTwo }, () => addressTwo && addressTwo.length > 1, 'dontSuggestRoad');
  }),

  postcodeSuggestionSearch: Ember.observer('customer', 'customer.postcode', function() {
    const trigger = Ember.$('#postcodeSuggestionDropdownTrigger');
    const debounceId = 'debouncedPostcodeSuggestion';
    let postcode = this.get('customer.postcode');

    this.suggestionSearch(trigger, debounceId, 'postcode', { postcode: postcode }, () => postcode && postcode.length > 1, 'dontSuggestPostcode');
  }),

  customerSearch: Ember.observer('customer', 'customer.telephone', 'customer.addressOne', 'customer.addressTwo', 'customer.postcode', function() {
    let telephone = this.get('customer.telephone');
    let addressOne = this.get('customer.addressOne');
    let addressTwo = this.get('customer.addressTwo');
    let postcode = this.get('customer.postcode');
    let _this = this;

    Ember.run.cancel(this.get('debouncedSearch'));

    if (!this.get('customerBrowserVisible')) {
      return;
    }

    if ((addressOne && addressOne.length > 2) || (addressTwo && addressTwo.length > 2) ||
          (postcode && postcode.length > 2) || (telephone && telephone.length > 2)) {

      this.set('debouncedSearch', Ember.run.debounce(this, function() {
        this.store.query('delivery-customer', {
          addressOne: addressOne,
          addressTwo: addressTwo,
          postcode: postcode,
          telephone: telephone
        }).then(function(customers) {
          _this.set('deliveryCustomerResults', customers);
          _this.set('debouncedSearch', '');
        }).catch(function(response) {
          _this.set('debouncedSearch', '');
          _this.send('showMessage', 'overlay', {
            header: 'Error searching for customers :(',
            body: response.errors[0].message
          });
        });

      }, 1500));

    } else {
      this.set('deliveryCustomerResults', []);
      this.set('debouncedSearch', '');
    }
  }),

  actions: {

    categoryItemClick(category) {
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

    setCustomer(type) {
      let customer = this.store.createRecord(type);
      this.set('customer', customer);

      if (type === 'delivery-customer') {
        this.send('showCustomerBrowser');
      }
    },

    setAddressTwo(addressTwo) {
      const dropdownTrigger = Ember.$('#addressSuggestionDropdownTrigger');
      dropdownTrigger.parent().removeClass('open');

      this.set('dontSuggestRoad', true);
      this.set('customer.addressTwo', addressTwo);
    },

    setPostcode(postcode) {
      const dropdownTrigger = Ember.$('#postcodeSuggestionDropdownTrigger');
      dropdownTrigger.parent().removeClass('open');

      this.set('dontSuggestPostcode', true);
      this.set('customer.postcode', postcode);
    },

    selectCustomer(deliveryCustomer) {
      //the order of these is important as we now set 'customerBrowserVisible' to false
      //so that any property changes on customer does not trigger an ajax request
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

    removeCustomer() {
      let customer = this.get('customer');

      if (customer && customer.get('id') === null) {
        customer.destroyRecord();
      }
      this.set('customer', null);
    },

    removeAndHideCustomerBrowser() {
      this.send('removeCustomer');
      this.send('hideCustomerBrowser');
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
