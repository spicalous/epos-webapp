import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['inline-customer-input'],

  canRemove: true,

  /**
   *  customer.constructor.modelName (store.createRecord)
   *  customer.content.constructor.modelName (store.findRecord)
   */
  customerType: Ember.computed('customer', function() {
    return this.get('customer.constructor.modelName') || this.get('customer.content.constructor.modelName');
  }),

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
