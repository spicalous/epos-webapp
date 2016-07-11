import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['inline-customer-input'],

  actions: {

    selectTakeaway() {
      this.get('selectTakeaway')();
    },

    selectDelivery() {
      this.get('selectDelivery')();
    },

    selectEatIn() {
      this.get('selectEatIn')();
    },

    removeCustomer() {
      this.get('removeCustomer')();
    }

  }
});
