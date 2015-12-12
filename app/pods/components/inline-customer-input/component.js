import Ember from 'ember';

export default Ember.Component.extend({

  actions: {

    setCustomer(type) {
      this.sendAction('setCustomer', type);
    },

    removeCustomer() {
      this.sendAction('removeCustomer');
    }

  }
});
