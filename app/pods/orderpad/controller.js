import Ember from 'ember';

export default Ember.Controller.extend({

  selectedCategory: '',
  numpadValue: '',

  searchAddress: Ember.computed('searchAddressRaw', function() {
    return this.get('searchAddressRaw') ? this.get('searchAddressRaw').trim() : '';
  }),

  searchPostcode: Ember.computed('searchPostcodeRaw', function() {
    return this.get('searchPostcodeRaw') ? this.get('searchPostcodeRaw').trim() : '';
  }),

  searchContactNumber: Ember.computed('searchContactNumberRaw', function() {
    return this.get('searchContactNumberRaw') ? this.get('searchContactNumberRaw').trim() : '';
  }),

  canSaveCustomer: Ember.computed('validSearchDeliveryCustomer', 'emptySearchResults', function() {
    return this.get('validSearchDeliveryCustomer') && this.get('emptySearchResults');
  }),

  emptySearchResults: Ember.computed.empty('deliveryCustomerResults'),

  validSearchDeliveryCustomer: Ember.computed('customerFieldsNonEmpty', 'searchContactNumber', function() {
    return this.get('customerFieldsNonEmpty') && this.get('searchContactNumber').length === 11;
  }),

  customerFieldsNonEmpty: Ember.computed('searchAddress', 'searchPostcode', 'searchContactNumber', function() {
    return this.get('searchAddress') && this.get('searchPostcode') && this.get('searchContactNumber');
  }),

  hasCustomerQuery: Ember.computed('searchAddress', 'searchPostcode', 'searchContactNumber', function() {
    return this.get('searchAddress') || this.get('searchPostcode') || this.get('searchContactNumber');
  }),

  invalidOrder: Ember.computed('emptyOrder', 'validCustomer', function() {
    return this.get('emptyOrder') || !this.get('validCustomer');
  }),

  validCustomer: Ember.computed('model.customer', 'model.customer.name', 'model.customer.contactNumber', function() {
    let customer = this.get('model.customer');

    return !!customer.get('contactNumber') && customer.get('contactNumber').length === 11 &&
        ((customer.get('customerType') === 'takeaway-customer') ?
            !!customer.get('name') :
            (customer.get('customerType') === 'delivery-customer') ?
              (!!customer.get('address') && !!customer.get('postcode')) :
              false);
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

  customerSearch: Ember.observer('searchAddressRaw', 'searchPostcodeRaw', 'searchContactNumberRaw', function() {
    let debouncedSearch = this.get('debouncedSearch');
    let address = this.get('searchAddress');
    let postcode = this.get('searchPostcode');
    let contactNumber = this.get('searchContactNumber');

    if (address || postcode || contactNumber) {

      if (debouncedSearch) {
        Ember.run.cancel(debouncedSearch);
      }

      this.set('debouncedSearch', Ember.run.debounce(this, function() {
        let address = this.get('searchAddress');
        let postcode = this.get('searchPostcode');
        let contactNumber = this.get('searchContactNumber');
        let _this = this;

        this.store.query('delivery-customer', {
          address: address,
          postcode: postcode,
          contactNumber: contactNumber
        }).then(function(customers) {
          _this.set('deliveryCustomerResults', customers);
          _this.set('debouncedSearch', '');
        });

      }, 1000));

    } else {
      Ember.run.cancel(debouncedSearch);
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

    setCustomer(customerType) {
      if (customerType === 'takeaway-customer') {
        let customer = this.store.createRecord(customerType, { customerType: customerType });
        this.set('model.customer', customer);
      }
      if (customerType === 'delivery-customer') {
        this.send('showCustomerBrowser');
      }
    },

    selectCustomer(deliveryCustomer) {
      deliveryCustomer.set('customerType', 'delivery-customer');
      this.set('model.customer', deliveryCustomer);
      this.send('hideCustomerBrowser');
    },

    saveAndSelectCustomer() {
      let customer = this.store.createRecord('delivery-customer', {
        customerType: 'deliveryCustomer',
        address: this.get('searchAddress'),
        postcode: this.get('searchPostcode'),
        contactNumber: this.get('searchContactNumber')
      });

      let _this = this;
      let _customer = customer;

      customer.save().then(function() {
        _this.send('selectCustomer', _customer);
      }).catch(function() {
        console.log('FAILED TO SELECT CUSTOMER! WHAT DO I DO!?');
      });

    },

    removeCustomer() {
      this.set('model.customer', this.store.createRecord('customer', {}));
    },

    hideCustomerBrowser() {
      this.set('searchAddressRaw', '');
      this.set('searchPostcodeRaw', '');
      this.set('searchContactNumberRaw', '');

      return true; //bubble to the route
    },

    submitOrder() {
      if (this.get('invalidOrder')) {
        return;
      }

      var _this = this,
          order = this.get('model.order');

      order.set('dateTime', new Date());
      order.set('customer', this.get('model.customer'));

      order.save().then(function() {

        _this.send('reset');
        _this.send('showMessage', 'overlay', {
          header: 'Confirmed ^.^',
          body: 'Order submitted successfully',
          callback: function() {
            _this.set('model.order', _this.store.createRecord('order', {}));
            _this.set('model.customer', _this.store.createRecord('customer', {}));
          }
        });

      }, function(response) {
        var modalWasOpen = $('#orderpad-modal').hasClass('in');

        _this.send('reset');
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
      if (this.get('emptyOrder')) {
        return;
      }
      this.send('reset');
      this.get('model.order').destroyRecord();
      this.set('model.order', this.store.createRecord('order', {}));
      this.send('showMessage', 'overlay', {
        header: 'Order Cancelled'
      });
    },

    reset() {
      this.set('selectedCategory', '');
      this.set('numpadValue', '');
      $('#orderpad-modal').modal('hide');
    }

  }
});

//TODO [HIGH]            unhappy path for saving customer
//TODO [MEDIUM] Feedback 'error' for take away customer input (number length !== 11)
//TODO [MEDIUM] Confirms before submit order
//TODO                   before cancel order
//TODO                   before selecting delivery customer
//TODO                   before saving and selecting delivery customer
