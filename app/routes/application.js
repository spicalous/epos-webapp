import { next } from '@ember/runloop';
import Route from '@ember/routing/route';

export default Route.extend({

  actions: {

    showToast(message) {
      this.disconnectOutlet({
        outlet: 'toast',
        parentView: 'application'
      });
      next(this, () => {
        this.render('toast', {
          into: 'application',
          outlet: 'toast',
          model: { message: message }
        });
      });
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
