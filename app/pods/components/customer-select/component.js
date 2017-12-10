import { empty } from '@ember/object/computed';
import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({

  searchInProgress: false,

  canSaveCustomer: computed('validCustomer', 'emptySearchResults', 'searchInProgress', function() {
    return this.get('validCustomer') && this.get('emptySearchResults') && !this.get('searchInProgress');
  }),

  emptySearchResults: empty('deliveryCustomerResults'),

  validQuery: computed('customer.telephone', 'customer.addressOne', 'customer.addressTwo', 'customer.postcode', function() {
    let { telephone, addressOne, addressTwo, postcode } = this.get('customer');

    return (telephone && telephone.length > 2) || (addressOne && addressOne.length > 2) ||
           (addressTwo && addressTwo.length > 2) || (postcode && postcode.length > 2);
  }),

  actions: {

    updateSearchInProgress(value) {
      this.set('searchInProgress', value);
    },

    setDeliveryCustomerResults(deliveryCustomers) {
      this.set('deliveryCustomerResults', deliveryCustomers);
    },

    save() {
      this.get('saveCustomer')();
    },

    selectCustomer(customer) {
      this.get('selectCustomer')(customer);
    },

    cancel() {
      this.get('cancel')();
    }

  }
});
