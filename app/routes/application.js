import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    showMessage(name, model) {
      this.render(name, {
        into: 'application',
        outlet: name,
        model: model
      });
    },
    dismissMessage(name, callback) {
      this.disconnectOutlet({
        outlet: name,
        parentView: 'application'
      });
      if (callback) {
        callback();
      }
    }
  }
});
