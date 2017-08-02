import Ember from 'ember';

export default Ember.Component.extend({

  store: Ember.inject.service(),

  _handleCustomerSearchResults(query, customers) {
    if (query && query === this.get('latestQuery')) {
      this.set('deliveryCustomerResults', customers);
    } else {
      console.warn('Promise does not belong to the latest request');
    }
  },

  _handleFailedCustomerSearch(query, response) {
    this.send('showMessage', 'overlay', {
        header: 'Error searching for customers :(',
        body: response.errors[0].message
    });
  },

  queryDeliveryCustomer(customer) {
    let query = this.get('store').query('delivery-customer', customer);

    query.then(this._handleCustomerSearchResults.bind(this, query))
         .catch(this._handleFailedCustomerSearch.bind(this, query));

    this.set('latestQuery', query);
  },

  customerSearch: Ember.observer('customer', 'customer.telephone', 'customer.addressOne', 'customer.addressTwo', 'customer.postcode', function() {
    let telephone = this.get('customer.telephone') ? this.get('customer.telephone').trim() : '';
    let addressOne = this.get('customer.addressOne') ? this.get('customer.addressOne').trim() : '';
    let addressTwo = this.get('customer.addressTwo') ? this.get('customer.addressTwo').trim() : '';
    let postcode = this.get('customer.postcode') ? this.get('customer.postcode').trim() : '';

    Ember.run.cancel(this.get('debouncedSearch'));

    if (telephone.length > 2 || addressOne.length > 2 || addressTwo.length > 2 || postcode.length > 2) {

      this.set('debouncedSearch', Ember.run.debounce(
        this,
        this.queryDeliveryCustomer.bind(this, {
          telephone: telephone,
          addressOne: addressOne,
          addressTwo: addressTwo,
          postcode: postcode
        }),
        1500));
    }
  }),

  actions: {

    selectDeliveryCustomer(customer) {
      this.get('selectDeliveryCustomer')(customer);
    },

    cancel() {
      this.get('cancel')();
    }

  }
});
