import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    categoryItemClick: function(categoryItem) {

    },
    submitOrder: function() {
      this.get('model').order
        .set('date', Date.now())
        .save()
        .then(function() {
          //TODO Find a way to refresh just model.order otherwise a REST call is made for a non-changing menu
          console.log('failed');
        }, function() {
          console.log('success');
        });
    }
  }
});
