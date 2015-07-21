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
    },
    submitOrder: function() {
      var _this = this;

      this.get('model.order')
          .set('dateTime', new Date())
          .save()
          .then(function() {
            //TODO [MEDIUM] Handle fail scenarios
          }, function() {
            //TODO [MEDIUM] Find a way to refresh just model.order otherwise a REST call is made for a non-changing menu
            //TODO [MEDIUM] Do not keep order and order items on client
            //TODO [MEDIUM] Accepted Feedback
            $('#orderpad-modal').modal('hide');
            _this.transitionToRoute('index');
          });
    },
    cancelOrder: function() {
      //TODO [MEDIUM] Find a way to refresh just model.order otherwise a REST call is made for a non-changing menu
      //TODO [MEDIUM] Do not keep order and order items on client
      //TODO [MEDIUM] Confirm Cancel
      $('#orderpad-modal').modal('hide');
      this.send('refresh');
    }
  }
});
