import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['inline-customer-input'],

  actions: {

    createCustomer(type) {
      this.sendAction('createCustomer', type);
    },

    removeCustomer() {
      this.sendAction('removeCustomer');
    }

  }
});
