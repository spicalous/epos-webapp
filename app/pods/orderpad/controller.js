import Ember from 'ember';

export default Ember.Controller.extend({
  filter: '',
  filterObserver: function() {
    var filter = this.get('filter');
    var _this = this;

    if (filter === '') {
       _this.set('model.menu', this.store.all('menu-item'));
    } else {
      this.store.filter('menu-item', function(menuItem) {
        return menuItem.get('categories').indexOf(filter) > -1;
      }).then(function(filteredMenu){
        _this.set('model.menu', filteredMenu);
      });
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
      setTimeout(function() {
        $('#orderpad-order').scrollTop($('#orderpad-order').scrollTop() + 55);
      }, 100);
    },
    submitOrder: function() {
      var _this = this;

      this.get('model.order').set('dateTime', new Date()).save().then(function() {
        _this.send('reset');
        _this.send('showOverlay', 'overlay', {
          header: 'Confirmed',
          message: 'Order submitted successfully',
          callback: function() {
            _this.set('model.order', _this.store.createRecord('order', {}));
          }
        });
      }, function(response) {
        _this.send('showOverlay', 'overlay', { header: 'Failed', message: response.responseText });
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

//TODO [HIGH]   Client-side error checking
//TODO [MEDIUM] Confirm before submit
//TODO [MEDIUM] Confirm before cancel
//TODO [LOW]    Acknowledge mobile order item add
