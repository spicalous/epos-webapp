import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    showMessage: function(name, model) {
      this.render(name, {
        into: 'application',
        outlet: 'message',
        view: name,
        model: model
      });
    },
    dismissMessage: function(callback) {
      this.disconnectOutlet({
        outlet: 'message',
        parentView: 'application'
      });
      if (callback) {
        callback();
      }
    }
  }
});
