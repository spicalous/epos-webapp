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
      let telephone = this.get('telephone') ? this.get('telephone').trim() : '';
      let addressOne = this.get('addressOne') ? this.get('addressOne').trim() : '';
      let addressTwo = this.get('addressTwo') ? this.get('addressTwo').trim() : '';
      let postcode = this.get('postcode') ? this.get('postcode').trim() : '';

      this.send('showMessage', 'loader', { message: 'Searching customer..' });
      this.store.query('delivery-customer', {
        addressOne: addressOne,
        addressTwo: addressTwo,
        postcode: postcode,
        telephone: telephone,
        limit: 50
      }).then((customers) => {
        this.send('dismissMessage', 'loader');
        this.set('deliveryCustomerResults', customers);
      }).catch((response) => {
        this.send('dismissMessage', 'loader');
        this.send('showMessage', 'overlay', {
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
