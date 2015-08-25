import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    showMessage(name, message) {
      this.render(name, {
        into: 'application',
        outlet: name,
        model: message
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
