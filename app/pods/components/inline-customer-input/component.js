import Ember from 'ember';

export default Ember.Component.extend({

  actions: {

    setCustomer(customerType) {
      this.sendAction('setCustomer', customerType);
    },

    removeCustomer() {
      this.sendAction('removeCustomer');
    }

  }
});
