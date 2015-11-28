import Ember from 'ember';

export default Ember.Controller.extend({

  selectedCategory: '',
  numpadValue: '',
  searchAddress: '',
  searchPostcode: '',
  searchContactNumber: '',

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

  customerBrowserSearch: Ember.observer('searchAddress', 'searchPostcode', 'searchContactNumber', function() {
    let searchAddress = this.get('searchAddress').trim();
    let searchPostcode = this.get('searchPostcode').trim();
    let searchContactNumber = this.get('searchContactNumber').trim();
    let debounce = this.get('searchDebounce');

    if (searchAddress || searchPostcode || searchContactNumber) {
      this.set('searchDebounce', Ember.run.debounce(this, 'searchDeliveryCustomer', searchAddress, searchPostcode, searchContactNumber, 1000));
    } else {
      Ember.run.cancel(debounce);
    }
  }),

  searchDeliveryCustomer(searchAddress, searchPostcode, searchContactNumber) {
    console.log('Searching: address=' + searchAddress + ' postcode=' + searchPostcode + ' contactNumber=' + searchContactNumber);
    var _this = this;
    this.store.query('delivery-customer', {
      searchAddress: searchAddress,
      searchPostcode: searchPostcode,
      searchContactNumber: searchContactNumber
    }).then(function(customers) {
      _this.set('deliveryCustomerResults', customers);
    });
  },

  invalidOrder: Ember.computed('emptyOrder', function() {
    return this.get('emptyOrder');
  }),

  emptyOrder: Ember.computed('model.order.size', function() {
    return this.get('model.order.size') > 0 ? false : true;
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
        let customer = this.store.createRecord(customerType, {customerType: customerType});
        this.set('model.customer', customer);
      }
      if (customerType === 'delivery-customer') {
          this.send('showCustomerBrowser');
      }
    },

    removeCustomer() {
      this.get('model.customer').destroyRecord();
      this.set('model.customer', this.store.createRecord('customer', {}));
      this.send('resize');
    },

    hideCustomerBrowser() {
      this.set('searchAddress', '');
      this.set('searchPostcode', '');
      this.set('searchContactNumber', '');

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
