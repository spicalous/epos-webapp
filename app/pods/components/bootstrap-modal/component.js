import Ember from 'ember';

export default Ember.Component.extend({

  didInsertElement() {
    const modal = this.$('.modal');

    modal.modal('show');
    modal.on('hidden.bs.modal', this.get('onDismissed'));
  },

  actions: {

    onConfirm() {
      const modal = this.$('.modal');
      modal.modal('hide');
      modal.on('hidden.bs.modal', this.get('onConfirm'));
    }

  }
});
