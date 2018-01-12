import { cancel, debounce } from '@ember/runloop';
import { observer } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

const ROAD_DEBOUNCE_ID_PROP_NAME = '__roadSuggestionDebounceId';
const POSTCODE_DEBOUNCE_ID_PROP_NAME = '__postcodeSuggestionDebounceId';

export default Component.extend({

  store: service(),

  classNames: ['delivery-customer-search'],

  /**
   * @param {string} debounceIdPropName   id for tracking debounce
   * @param {string} model                name for the model to search for
   * @param {Object} query                key value pair of field and value to query
   * @param {Function mapResults          handler for mapping the search results
   */
  suggestionSearch(debounceIdPropName, model, query, mapResults) {
    cancel(this.get(debounceIdPropName));

    this.set(debounceIdPropName, debounce(this, () => {

      this.get('store').query(model, query).then((suggestions) => {
        this.set(debounceIdPropName, '');
        this.set(model + 'Suggestions', mapResults(suggestions));
        this.set(model + 'SuggestionError', false);
      }).catch(() => {
        this.set(debounceIdPropName, '');
        this.set(model + 'Suggestions', []);
        this.set(model + 'SuggestionError', true);
      });

    }, 200));
  },

  customerSearch: observer('customer', 'customer.telephone', 'customer.addressOne', 'customer.addressTwo', 'customer.postcode', function() {
    let telephone = this.get('customer.telephone') ? this.get('customer.telephone').trim() : '';
    let addressOne = this.get('customer.addressOne') ? this.get('customer.addressOne').trim() : '';
    let addressTwo = this.get('customer.addressTwo') ? this.get('customer.addressTwo').trim() : '';
    let postcode = this.get('customer.postcode') ? this.get('customer.postcode').trim() : '';

    cancel(this.get('debouncedSearch'));

    if (telephone.length > 2 || addressOne.length > 2 || addressTwo.length > 2 || postcode.length > 2) {

      this.get('onSearchStatusChange')(true);
      this.set('debouncedSearch', debounce(this, 'queryDeliveryCustomer', {
          telephone: telephone,
          addressOne: addressOne,
          addressTwo: addressTwo,
          postcode: postcode
        }, 500));
    }
  }),

  queryDeliveryCustomer(customer) {
    let query = this.get('store').query('delivery-customer', customer);
    this.set('latestQuery', query);

    query.then(this._handleCustomerSearchResults.bind(this, query))
         .catch(this._handleFailedCustomerSearch.bind(this, query));
  },

  _handleCustomerSearchResults(query, customers) {
    if (query && query === this.get('latestQuery')) {
      this.get('onSearchStatusChange')(false);
      this.set('debouncedSearch', null);
      this.get('onSearch')(customers);
    } else {
      console.warn('Promise does not belong to the latest request'); // eslint-disable-line no-console
    }
  },

  _handleFailedCustomerSearch(query, response) {
    this.send('showMessage', 'overlay', {
        header: 'Error searching for customers :(',
        body: response.errors[0].message
    });

    if (query && query === this.get('latestQuery')) {
      this.get('onSearchStatusChange')(false);
      this.set('debouncedSearch', null);
    }
  },

  actions: {

    roadSuggestionSearch(road) {
      this.suggestionSearch(
        ROAD_DEBOUNCE_ID_PROP_NAME,
        'road',
        { road: road },
        (results) => results.map((result) => result.get('name')));
    },

    postcodeSuggestionSearch(postcode) {
      this.suggestionSearch(
        POSTCODE_DEBOUNCE_ID_PROP_NAME,
        'postcode',
        { postcode: postcode },
        (results) => results.map((result) => result.get('postcode')));
    }

  }
});
