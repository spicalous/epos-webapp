import Ember from 'ember';

export default Ember.Controller.extend({

  emptySearch: Ember.computed('model.contactNumber', 'model.addressOne', 'model.addressTwo', 'model.postcode', function() {
    return !(this.get('model.contactNumber') || this.get('model.addressOne') || this.get('model.addressTwo') || this.get('model.postcode'));
  }),

  actions: {

    searchCustomer() {
      let contactNumber = this.get('model.contactNumber');
      let addressOne = this.get('model.addressOne');
      let addressTwo = this.get('model.addressTwo');
      let postcode = this.get('model.postcode');
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
