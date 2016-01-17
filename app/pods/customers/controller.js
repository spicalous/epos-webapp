import Ember from 'ember';

export default Ember.Controller.extend({

  searchAddressOne: Ember.computed('searchAddressOneRaw', function() {
    return this.get('searchAddressOneRaw') ? this.get('searchAddressOneRaw').trim() : '';
  }),

  searchAddressTwo: Ember.computed('searchAddressTwoRaw', function() {
    return this.get('searchAddressTwoRaw') ? this.get('searchAddressTwoRaw').trim() : '';
  }),

  searchPostcode: Ember.computed('searchPostcodeRaw', function() {
    return this.get('searchPostcodeRaw') ? this.get('searchPostcodeRaw').trim() : '';
  }),

  searchContactNumber: Ember.computed('searchContactNumberRaw', function() {
    return this.get('searchContactNumberRaw') ? this.get('searchContactNumberRaw').trim() : '';
  }),

  emptySearch: Ember.computed('searchAddressOneRaw', 'searchAddressTwoRaw', 'searchPostcodeRaw', 'searchContactNumberRaw', function() {
    return !(this.get('searchAddressOneRaw') || this.get('searchAddressTwoRaw') || this.get('searchPostcodeRaw') || this.get('searchContactNumberRaw'));
  }),

  actions: {

    searchCustomer() {
      let addressOne = this.get('searchAddressOne');
      let addressTwo = this.get('searchAddressTwo');
      let postcode = this.get('searchPostcode');
      let contactNumber = this.get('searchContactNumber');
      let _this = this;

      this.send('showMessage', 'loader', { message: 'Searching customer..' });
      this.store.query('delivery-customer', {
        addressOne: addressOne,
        addressTwo: addressTwo,
        postcode: postcode,
        contactNumber: contactNumber
      }).then(function(customers) {
        _this.send('dismissMessage', 'loader');
        _this.set('deliveryCustomerResults', customers);
      }).catch(function(response) {
        _this.send('dismissMessage', 'loader');
        _this.set('debouncedSearch', '');
        _this.send('showMessage', 'overlay', {
          header: 'Error searching for customers :(',
          body: response.errors[0].message
        });
      });
    },

    transitionToCustomer(customer) {
      this.transitionToRoute('deliveryCustomer', customer);
    }
  }

});
