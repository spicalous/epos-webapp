import Ember from 'ember';

export default Ember.Component.extend({

  actions: {

    createCustomer(type) {
      this.sendAction('createCustomer', type);
    },

    removeCustomer() {
      this.sendAction('removeCustomer');
    }

  }
});
