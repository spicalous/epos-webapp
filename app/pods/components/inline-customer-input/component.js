import Ember from 'ember';

export default Ember.Component.extend({

  orderType: '',

  actions: {

    setOrderType(orderType) {
      this.set('orderType', orderType);
    },

    showCustomerBrowser() {
      this.sendAction('showCustomerBrowser');
    },

    hideCustomerBrowser() {
      this.sendAction('hideCustomerBrowser');
    }
  }
});
