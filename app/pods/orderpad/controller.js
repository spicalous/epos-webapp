import Ember from 'ember';
import config from '../../config/environment';

export default Ember.Controller.extend({

  featureFlags: {
    NAV_BAR_ENABLED: config.APP.NAV_BAR_ENABLED
  },

  selectedCategory: '',
  numpadValue: '',
  paymentMethods: ['CASH', 'CARD', 'ONLINE'],
  estimatedDeliveryTimes: ['20', '25', '30', '35', '40', '45', '50', '55', '60', '70'],

  searchAddressOne: Ember.computed('searchAddressOneRaw', function() {
    return this.get('searchAddressOneRaw') ? this.get('searchAddressOneRaw').trim() : '';
  }),

  searchAddressTwo: Ember.computed('searchAddressTwoRaw', function() {
    return this.get('searchAddressTwoRaw') ? this.get('searchAddressTwoRaw').trim() : '';
  }),

  searchPostcode: Ember.computed('searchPostcodeRaw', function() {
    return this.get('searchPostcodeRaw') ? this.get('searchPostcodeRaw').trim() : '';
  }),

  searchContactNumber: Ember.computed('searchContactNumberRaw', function() {
    return this.get('searchContactNumberRaw') ? this.get('searchContactNumberRaw').trim() : '';
  }),

  canSaveCustomer: Ember.computed('validSearchDeliveryCustomer', 'emptySearchResults', 'debouncedSearch', function() {
    return this.get('validSearchDeliveryCustomer') && this.get('emptySearchResults') && !this.get('debouncedSearch');
  }),

  emptySearchResults: Ember.computed.empty('deliveryCustomerResults'),

  validSearchDeliveryCustomer: Ember.computed('customerFieldsNonEmpty', 'searchContactNumber', function() {
    return this.get('customerFieldsNonEmpty') && this.get('searchContactNumber').length === 11;
  }),

  customerFieldsNonEmpty: Ember.computed('searchAddressOne', 'searchAddressTwo', 'searchPostcode', 'searchContactNumber', function() {
    return (this.get('searchAddressOne') || this.get('searchAddressTwo')) && this.get('searchPostcode') && this.get('searchContactNumber');
  }),

  hasCustomerQuery: Ember.computed('searchAddressOne', 'searchAddressTwo', 'searchPostcode', 'searchContactNumber', function() {
    return this.get('searchAddressOne') || this.get('searchAddressTwo') || this.get('searchPostcode') || this.get('searchContactNumber');
  }),

  invalidOrder: Ember.computed('emptyOrder', 'validCustomer', function() {
    return this.get('emptyOrder') || !this.get('validCustomer');
  }),

  validCustomer: Ember.computed('model.customer', 'model.customer.invalidTelephone',
      'model.customer.invalidAddress', 'invalidPostcode', function() {

    let customer = this.get('model.customer');

    if (!customer) {
      return false;
    }
    if (customer.get('customerType') === 'takeaway-customer') {
      return !customer.get('invalidTelephone');
    }
    return !customer.get('invalidTelephone') && !customer.get('invalidAddress') && !customer.get('invalidPostcode');
  }),

  cannotCancelOrder: Ember.computed('model.customer', 'emptyOrder', function() {
    return this.get('emptyOrder') && !this.get('model.customer');
  }),

  emptyOrder: Ember.computed('model.order.size', function() {
    return this.get('model.order.size') > 0 ? false : true;
  }),

  filterMenu: Ember.observer('selectedCategory', 'numpadValue', function() {
    var menu = this.get('model.menu'),
        selectedCategory = this.get('selectedCategory'),
        menuIdFilter = this.get('numpadValue'),
        filteredMenu;

    if (selectedCategory) {
      filteredMenu = menu.filter(function(item) {
        var _selectedCategory = this;
        return item.get('categories').any(function(category) {
          return _selectedCategory === category;
        });
      }, selectedCategory);
    } else {
      filteredMenu = menu;
    }

    if (menuIdFilter) {
      filteredMenu = filteredMenu.filter(function(item) {
        return item.get('menuId').startsWith(menuIdFilter);
      });
    }

    this.set('menu', filteredMenu);
  }),

  customerSearch: Ember.observer('searchAddressOneRaw', 'searchAddressTwoRaw', 'searchPostcodeRaw', 'searchContactNumberRaw', function() {
    let addressOne = this.get('searchAddressOne');
    let addressTwo = this.get('searchAddressTwo');
    let postcode = this.get('searchPostcode');
    let contactNumber = this.get('searchContactNumber');
    let _this = this;

    Ember.run.cancel(this.get('debouncedSearch'));

    if (addressOne || addressTwo || postcode || contactNumber) {

      this.set('debouncedSearch', Ember.run.debounce(this, function() {
        this.store.query('delivery-customer', {
          addressOne: addressOne,
          addressTwo: addressTwo,
          postcode: postcode,
          contactNumber: contactNumber
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

      }, 1000));

    } else {
      this.set('deliveryCustomerResults', []);
      this.set('debouncedSearch', '');
    }
  }),

  actions: {

    categoryItemClick(categoryItem) {
      if (this.get('selectedCategory') === categoryItem) {
        this.set('selectedCategory', '');
      } else {
        this.set('selectedCategory', categoryItem);
      }
    },

    menuItemClick(menuItem) {
      this.get('model.order').addItem(menuItem);
      this.set('numpadValue', '');

      this.send('showMessage', 'toast', {
        body: 'Added ' + menuItem.get('name')
      });
    },

    setCustomer(type) {
      if (type === 'takeaway-customer') {
        let customer = this.store.createRecord(type);
        this.set('model.customer', customer);
      }
      if (type === 'delivery-customer') {
        this.send('showCustomerBrowser');
      }
    },

    selectCustomer(deliveryCustomer) {
      this.set('model.customer', deliveryCustomer);
      this.send('hideCustomerBrowser');
    },

    saveAndSelectCustomer() {
      let customer = this.store.createRecord('delivery-customer', {
        addressOne: this.get('searchAddressOne'),
        addressTwo: this.get('searchAddressTwo'),
        postcode: this.get('searchPostcode'),
        contactNumber: this.get('searchContactNumber')
      });

      let _this = this;
      let _customer = customer;

      this.send('showMessage', 'loader', { message: 'Saving customer..' });

      customer.save().then(function() {
        _this.send('dismissMessage', 'loader');
        _this.send('selectCustomer', _customer);
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
      this.set('model.customer', null);
    },

    hideCustomerBrowser() {
      this.set('searchAddressOneRaw', '');
      this.set('searchAddressTwoRaw', '');
      this.set('searchPostcodeRaw', '');
      this.set('searchContactNumberRaw', '');

      return true; //bubble to the route
    },

    submitOrder() {
      let _this = this,
          order = this.get('model.order'),
          modalWasOpen = $('#orderpad-modal').hasClass('in');

      $('#orderpad-modal').modal('hide');
      this.send('showMessage', 'loader', { message: 'Sending order..' });

      order.set('dateTime', new Date());
      order.set('customer', this.get('model.customer'));
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
              $('#orderpad-modal').modal('show');
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
      $('#orderpad-modal').modal('hide');
    }

  }

});
