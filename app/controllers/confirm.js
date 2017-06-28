import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {

    onConfirm() {
      let confirmCallback = this.get('model.confirm');
      this.send('dismissMessage', 'confirm', confirmCallback);
    },

    removeConfirmOutlet() {
      this.send('dismissMessage', 'confirm');
    }

  }
});
