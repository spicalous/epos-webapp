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

  invalidOrder: Ember.computed('emptyOrder', function() {
    return this.get('emptyOrder');
  }),

  emptyOrder: Ember.computed('model.order.size', function() {
    return this.get('model.order.size') > 0 ? false : true;
  }),

  actions: {

    categoryItemClick(categoryItem) {
      if (this.get('filter') === categoryItem) {
        //Reset filter
        this.set('filter', '');
      } else {
        this.set('filter', categoryItem);
      }
    },

    menuItemClick(menuItem) {
      this.get('model.order').addItem(menuItem);
      this.send('showMessage', 'toast', {
        body: 'Added ' + menuItem.get('name')
      });

      //TODO: scroll to item added instead of scrolling down
      setTimeout(function() {
        $('#orderpad-order').scrollTop($('#orderpad-order').scrollTop() + 55);
      }, 100);

    },

    submitOrder() {
      var _this = this,
          order = this.get('model.order');

      order.set('dateTime', new Date());

      order.save().then(function() {

        _this.send('reset');
        _this.send('showMessage', 'overlay', {
          header: 'Confirmed',
          body: 'Order submitted successfully',
          callback: function() {
            _this.set('model.order', _this.store.createRecord('order', {}));
          }
        });

      }, function(response) {
        var modalWasOpen = $('#orderpad-modal').hasClass('in');

        _this.send('reset');
        _this.send('showMessage', 'overlay', {
          header: 'Failed',
          body: response.responseText,
          danger: true,
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
    },

    reset() {
      this.set('filter', '');
      $('#orderpad-modal').modal('hide');
    }

  }
});

//TODO [MEDIUM] Confirm before submit
//TODO [MEDIUM] Confirm before cancel
