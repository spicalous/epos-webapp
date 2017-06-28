import Ember from 'ember';

export default Ember.Component.extend({

  /*
   * We bind onDismiss to the modal being hidden so that we can perform any actions when dismissing the modal
   */
  didInsertElement() {
    const modal = this.$('.modal');
    modal.modal('show');
    modal.on('hidden.bs.modal', this.get('onDismissed'));
  },

  actions: {

    /*
     * We unbind the onDismiss event to that it does not trigger onConfirm
     */
    onConfirm() {
      const modal = this.$('.modal');
      modal.off('hidden.bs.modal');
      modal.modal('hide');
      modal.on('hidden.bs.modal', this.get('onConfirm'));
    }

  }
});
