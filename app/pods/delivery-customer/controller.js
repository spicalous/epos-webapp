import Ember from 'ember';

export default Ember.Controller.extend({

  editDisabled: Ember.computed.not('editable'),

  editable: false,

  actions: {

    enableEdit() {
      this.set('editable', true);
    },

    disableEdit() {
      this.set('editable', false);
    },

    saveEdit() {

    }
  }

});
