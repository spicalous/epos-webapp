import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {

    onConfirm() {
      let confirmCallback = this.get('model.confirm');
      this.send('dismissMessage', 'confirm', confirmCallback);
    },

    onCancel() {
      let cancelCallback = this.get('model.cancel');
      this.send('dismissMessage', 'confirm', cancelCallback);
    }
  }

});
