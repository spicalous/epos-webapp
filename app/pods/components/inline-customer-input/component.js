import Ember from 'ember';

export default Ember.Component.extend({

  actions: {

    setCustomer(customerType) {
      this.sendAction('setCustomer', customerType);
    },

    removeCustomer() {
      this.sendAction('removeCustomer');
    },

    showCustomerBrowser() {
      this.sendAction('showCustomerBrowser');
    },

    hideCustomerBrowser() {
      this.sendAction('hideCustomerBrowser');
    }
  }
});
