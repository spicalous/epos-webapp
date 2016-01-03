import Ember from 'ember';

export default Ember.Controller.extend({

  searchAddress: Ember.computed('searchAddressRaw', function() {
    return this.get('searchAddressRaw') ? this.get('searchAddressRaw').trim() : '';
  }),

  searchPostcode: Ember.computed('searchPostcodeRaw', function() {
    return this.get('searchPostcodeRaw') ? this.get('searchPostcodeRaw').trim() : '';
  }),

  searchContactNumber: Ember.computed('searchContactNumberRaw', function() {
    return this.get('searchContactNumberRaw') ? this.get('searchContactNumberRaw').trim() : '';
  }),

  emptySearch: Ember.computed('searchAddressRaw', 'searchPostcodeRaw', 'searchContactNumberRaw', function() {
    return !(this.get('searchAddressRaw') || this.get('searchPostcodeRaw') || this.get('searchContactNumberRaw'));
  }),

  actions: {

    searchCustomer() {
      let address = this.get('searchAddress');
      let postcode = this.get('searchPostcode');
      let contactNumber = this.get('searchContactNumber');
      let _this = this;

      this.store.query('delivery-customer', {
        address: address,
        postcode: postcode,
        contactNumber: contactNumber
      }).then(function(customers) {
        _this.set('deliveryCustomerResults', customers);
      }).catch(function(response) {

      });
    }
  }

});

  //TODO Disable search button on empty input
