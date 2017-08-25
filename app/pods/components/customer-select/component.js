import Ember from 'ember';

export default Ember.Component.extend({

  searchInProgress: false,

  canSaveCustomer: Ember.computed('validCustomer', 'emptySearchResults', 'searchInProgress', function() {
    return this.get('validCustomer') && this.get('emptySearchResults') && !this.get('searchInProgress');
  }),

  emptySearchResults: Ember.computed.empty('deliveryCustomerResults'),

  validQuery: Ember.computed('customer.telephone', 'customer.addressOne', 'customer.addressTwo', 'customer.postcode', function() {
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
