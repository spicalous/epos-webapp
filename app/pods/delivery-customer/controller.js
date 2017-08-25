import Ember from 'ember';

export default Ember.Controller.extend({

  validQuery: Ember.computed('model.telephone', 'model.addressOne', 'model.addressTwo', 'model.postcode', function() {
    let { telephone, addressOne, addressTwo, postcode } = this.get('model');

    return (telephone && telephone.length > 2) || (addressOne && addressOne.length > 2) ||
           (addressTwo && addressTwo.length > 2) || (postcode && postcode.length > 2);
  }),

  actions: {

    updateSearchInProgress(value) {
      this.set('searchInProgress', value);
    },

    setDeliveryCustomers(deliveryCustomers) {
      this.set('deliveryCustomerResults', deliveryCustomers);
    },

    editCustomer(deliveryCustomer) {

    }

  }
});
