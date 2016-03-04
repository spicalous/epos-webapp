import Ember from 'ember';

export default Ember.Controller.extend({

  telephone: '',

  addressOne: '',

  addressTwo: '',

  postcode: '',

  emptySearch: Ember.computed('telephone', 'addressOne', 'addressTwo', 'postcode', function() {
    return !(this.get('telephone') || this.get('addressOne') || this.get('addressTwo') || this.get('postcode'));
  }),

  actions: {

    searchCustomer() {
      let telephone = this.get('telephone');
      let addressOne = this.get('addressOne');
      let addressTwo = this.get('addressTwo');
      let postcode = this.get('postcode');
      let _this = this;

      this.send('showMessage', 'loader', { message: 'Searching customer..' });
      this.store.query('delivery-customer', {
        addressOne: addressOne,
        addressTwo: addressTwo,
        postcode: postcode,
        telephone: telephone
      }).then(function(customers) {
        _this.send('dismissMessage', 'loader');
        _this.set('deliveryCustomerResults', customers);
      }).catch(function(response) {
        _this.send('dismissMessage', 'loader');
        _this.send('showMessage', 'overlay', {
          header: 'Error searching for customers :(',
          body: response.errors[0].message
        });
      });
    },

    transitionToCustomer(customer) {
      this.transitionToRoute('delivery-customer.edit', customer);
    }

  }

});
