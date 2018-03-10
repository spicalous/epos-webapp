import { computed } from '@ember/object';
import Controller from '@ember/controller';

export default Controller.extend({

  validQuery: computed('model.telephone', 'model.addressOne', 'model.addressTwo', 'model.postcode', function() {
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

    editCustomer() {

    }

  }
});
