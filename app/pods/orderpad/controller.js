import Ember from 'ember';

export default Ember.Controller.extend({

  filterObserver: function() {
    var filter = this.get('filter'),
        menu = this.get('model.menu'),
        _this = this;

    if (filter === '') {
       _this.set('menu', menu);
    } else {
      _this.set('menu', menu.filter(function(item) {
        var _filter = this;
        return item.get('categories').any(function(category) {
          return _filter === category;
        });
      }, filter));
    }
  }.observes('filter'),

  invalidOrder: true,

  invalidOrderSetter: function() {
    this.set('invalidOrder', this.get('emptyOrder'));
  }.observes('emptyOrder'),

  emptyOrder: true,

  orderSizeObserver: function() {
    this.set('emptyOrder',
      this.get('model.order.size') > 0 ? false : true);
  }.observes('model.order.size'),

  actions: {
    categoryItemClick: function(categoryItem) {
      if (this.get('filter') === categoryItem) {
        this.set('filter', ''); //Reset filter
      } else {
        this.set('filter', categoryItem);
      }
    },
    menuItemClick: function(menuItem) {
      this.get('model.order').addItem(menuItem);
      this.send('showMessage', 'toast', {
        message: 'Added ' + menuItem.get('name')
      });
      setTimeout(function() {
        $('#orderpad-order').scrollTop($('#orderpad-order').scrollTop() + 55);
      }, 100);
    },
    submitOrder: function() {
      var _this = this;

      this.get('model.order').set('dateTime', new Date()).save().then(function() {
        _this.send('reset');
        _this.send('showMessage', 'overlay', {
          header: 'Confirmed',
          message: 'Order submitted successfully',
          callback: function() {
            _this.set('model.order', _this.store.createRecord('order', {}));
          }
        });
      }, function(response) {
        var modalWasOpen = $('#orderpad-modal').hasClass('in');
        _this.send('reset');
        _this.send('showMessage', 'overlay', {
          header: 'Failed',
          message: response.responseText,
          danger: true,
          callback: function() {
            if (modalWasOpen) {
              $('#orderpad-modal').modal('show');
            }
          }
        });
      });
    },
    cancelOrder: function() {
      this.send('reset');
      this.get('model.order').destroyRecord();
      this.set('model.order', this.store.createRecord('order', {}));
    },
    reset: function() {
      this.set('filter', '');
      $('#orderpad-modal').modal('hide');
    }
  }
});

//TODO [MEDIUM] Confirm before submit
//TODO [MEDIUM] Confirm before cancel
