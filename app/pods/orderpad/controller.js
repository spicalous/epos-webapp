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

      this.get('model.order')
          .set('dateTime', new Date())
          .save()
          .then(function() {
            //TODO [MEDIUM] use error message from server
            _this.send('showOverlay', 'overlay', { header: 'Failed', message: 'placeholder' });
          }, function() {
            _this.send('showOverlay', 'overlay', { header: 'Confirmed', message: 'Order submitted successfully' });
            //TODO [MEDIUM] Find a way to refresh just model.order otherwise a REST call is made for a non-changing menu
            //TODO [MEDIUM] Do not keep order and order items on client
            //TODO [MEDIUM] Confirm Submit
            _this.set('filter', '');
            $('#orderpad-modal').modal('hide');
          });
    },
    cancelOrder: function() {
      //TODO [MEDIUM] Find a way to refresh just model.order otherwise a REST call is made for a non-changing menu
      //TODO [MEDIUM] Do not keep order and order items on client
      //TODO [MEDIUM] Confirm Cancel
      this.set('filter', '');
      $('#orderpad-modal').modal('hide');
      this.send('refresh');
    }
  }
});
