import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    showOverlay: function(name, model) {
      this.render(name, {
        into: 'application',
        outlet: 'overlay',
        model: model
      });
    },
    dismissOverlay: function(callback) {
      this.disconnectOutlet({
        outlet: 'overlay',
        parentView: 'application'
      });
      if (callback) {
        callback();
      }
    }
  }
});
