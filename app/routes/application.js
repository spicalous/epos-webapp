import Route from '@ember/routing/route';

export default Route.extend({

  actions: {

    showToast(message) {
      this.controller.send('setToastMessage', message);
    },

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
