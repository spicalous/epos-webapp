import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    categoryItemClick: function(categoryItem) {
      console.log(categoryItem.get('name'));
      //TODO [VERY HIGH] Filter menu model by selecting category
    },
    submitOrder: function() {
      var _this = this;

      this.get('model').order
          .set('date', Date.now())
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
