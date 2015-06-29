import Ember from 'ember';

export default Ember.Controller.extend({
  needs: 'menu',
  menuController: Ember.computed.alias("controllers.menu"),
  actions: {
    categoryItemClick: function(categoryItem) {
      if (this.get('menuController').get('filter') === categoryItem) {
        this.get('menuController').set('filter', ''); //Reset filter
      } else {
        this.get('menuController').set('filter', categoryItem);
      }
    },
    submitOrder: function() {
      var _this = this;

      this.get('model').order
          .set('dateTime', new Date())
          .save()
          .then(function() {
            //TODO [MEDIUM] Handle fail scenarios
          }, function() {
            //TODO [MEDIUM] Find a way to refresh just model.order otherwise a REST call is made for a non-changing menu
            //TODO [MEDIUM] Do not keep order and order items on client
            _this.send('refresh');
          });
    },
    cancelOrder: function() {
      //TODO [MEDIUM] Find a way to refresh just model.order otherwise a REST call is made for a non-changing menu
      //TODO [MEDIUM] Do not keep order and order items on client
      this.send('refresh');
    }
  }
});
