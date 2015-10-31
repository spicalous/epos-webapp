import Ember from 'ember';

export default Ember.Controller.extend({

  categoryFilter: '',
  numpadValue: '',

  filterMenu: function() {
    var menu = this.get('model.menu'),
        categoryFilter = this.get('categoryFilter'),
        menuIdFilter = this.get('numpadValue'),
        filteredMenu;

    if (categoryFilter) {
      filteredMenu = menu.filter(function(item) {
        var _categoryFilter = this;
        return item.get('categories').any(function(category) {
          return _categoryFilter === category;
        });
      }, categoryFilter);
    } else {
      filteredMenu = menu;
    }

    if (menuIdFilter) {
      filteredMenu = filteredMenu.filter(function(item) {
        return item.get('menuId').startsWith(menuIdFilter);
      });
    }

    this.set('menu', filteredMenu);
  }.observes('categoryFilter', 'numpadValue'),

  invalidOrder: Ember.computed('emptyOrder', function() {
    return this.get('emptyOrder');
  }),

  emptyOrder: Ember.computed('model.order.size', function() {
    return this.get('model.order.size') > 0 ? false : true;
  }),

  actions: {

    categoryItemClick(categoryItem) {
      if (this.get('categoryFilter') === categoryItem) {
        this.set('categoryFilter', ''); //Reset filter
      } else {
        this.set('categoryFilter', categoryItem);
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
      let customer = this.get('model.customer');
      customer.set('customerType', customerType);
    },

    removeCustomer() {
      let customer = this.get('model.customer');

      customer.destroyRecord();
      this.set('model.customer', this.store.createRecord('customer', {}));

      //fire window.resize() to recalculate height of orderlist. See component/temp/orderpad-wrapper
      Ember.run.next(this, function() {
        $(window).resize();
      });
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
      this.set('categoryFilter', '');
      this.set('numpadValue', '');
      $('#orderpad-modal').modal('hide');
    }

  }
});

//TODO [MEDIUM] Confirm before submit
//TODO [MEDIUM] Confirm before cancel
