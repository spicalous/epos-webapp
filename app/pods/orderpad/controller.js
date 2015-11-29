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

  invalidOrder: Ember.computed('emptyOrder', function() {
    return this.get('emptyOrder');
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
        });

      }, 1000));

    } else {
      Ember.run.cancel(debouncedSearch);
      this.set('deliveryCustomerResults', []);
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

    },

    removeCustomer() {
      this.set('model.customer', this.store.createRecord('customer', {}));
      this.send('resize');
    },

    hideCustomerBrowser() {
      this.set('searchAddressRaw', '');
      this.set('searchPostcodeRaw', '');
      this.set('searchContactNumberRaw', '');

      return true; //bubble to the route
    },

    submitOrder() {
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
            _this.send('resize');
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
    },

    resize() {
      //fire window.resize() to recalculate height of orderlist. See component/temp/orderpad-wrapper
      Ember.run.next(this, function() {
        $(window).resize();
      });
    }

  }
});

//TODO [MEDIUM] Confirm before submit
//TODO [MEDIUM] Confirm before cancel
