import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    categoryItemClick: function(categoryItem) {

    },
    submitOrder: function() {
      var _this = this;

      this.get('model').order
        .set('date', Date.now())
        .save()
        .then(function() {
          //TODO Handle fail scenarios
        }, function() {
          //TODO Find a way to refresh just model.order otherwise a REST call is made for a non-changing menu
          _this.send('refresh');
        });
    }
  }
});
