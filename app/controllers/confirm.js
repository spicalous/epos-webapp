import Controller from '@ember/controller';

export default Controller.extend({

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
