import Ember from 'ember';

const ROAD_DROPDOWN_TRIGGER = '#roadSuggestionDropdownTrigger';
const POSTCODE_DROPDOWN_TRIGGER = '#postcodeSuggestionDropdownTrigger';
const ROAD_DEBOUNCE_ID_PROP_NAME = '__roadSuggestionDebounceId';
const POSTCODE_DEBOUNCE_ID_PROP_NAME = '__postcodeSuggestionDebounceId';

export default Ember.Component.extend({

  store: Ember.inject.service(),

  /**
   * in the case where the user sets a property, causing an observer to fire and thus requesting a suggestion search. We
   * need a flag to prevent the search
   */
  dontSuggest: false,

  didInsertElement() {
    this.$(ROAD_DROPDOWN_TRIGGER).on('click tap', (event) => event.stopImmediatePropagation());
    this.$(POSTCODE_DROPDOWN_TRIGGER).on('click tap', (event) => event.stopImmediatePropagation());
  },

  willDestroyElement() {
    this.$(ROAD_DROPDOWN_TRIGGER).off();
    this.$(POSTCODE_DROPDOWN_TRIGGER).off();
  },

  canSaveCustomer: Ember.computed('validCustomer', 'emptySearchResults', 'debouncedSearch', function() {
    return this.get('validCustomer') && this.get('emptySearchResults') && !this.get('debouncedSearch');
  }),

  emptySearchResults: Ember.computed.empty('deliveryCustomerResults'),

  roadSuggestionSearch: Ember.observer('customer', 'customer.addressTwo', function() {
    const trigger = this.$(ROAD_DROPDOWN_TRIGGER);
    let addressTwo = this.get('customer.addressTwo') ? this.get('customer.addressTwo').trim() : '';

    if (this.get('dontSuggest')) {
      this.set('dontSuggest', false);
      return;
    }

    if (addressTwo && addressTwo.length > 1) {
      this.suggestionSearch(trigger, ROAD_DEBOUNCE_ID_PROP_NAME, 'road', { road: addressTwo }, 'dontSuggestRoad');
    } else {
      this._hideDropdown(trigger);
    }
  }),

  postcodeSuggestionSearch: Ember.observer('customer', 'customer.postcode', function() {
    const trigger = this.$(POSTCODE_DROPDOWN_TRIGGER);
    let postcode = this.get('customer.postcode') ? this.get('customer.postcode').trim() : '';

    if (this.get('dontSuggest')) {
      this.set('dontSuggest', false);
      return;
    }

    if (postcode && postcode.length > 1) {
      this.suggestionSearch(trigger, POSTCODE_DEBOUNCE_ID_PROP_NAME, 'postcode', { postcode: postcode });
    } else {
      this._hideDropdown(trigger);
    }
  }),

  /**
   * @param {HTMLElement} trigger          - element for triggering show/hide of the bootstrap dropdown
   * @param {string} debounceIdPropName    - id for debounce handling
   * @param {string} model                 - model name for query
   * @param {object} query                 - query params
   */
  suggestionSearch(trigger, debounceIdPropName, model, query) {
    Ember.run.cancel(this.get(debounceIdPropName));

    this.set(debounceIdPropName, Ember.run.debounce(this, () => {

      this.get('store').query(model, query).then((roads) => {
        this.set(debounceIdPropName, '');
        this.set(model + 'Suggestions', roads);
        this.set(model + 'SuggestionError', false);
        this._showDropdown(trigger);
      }).catch(() => {
        this.set(debounceIdPropName, '');
        this.set(model + 'Suggestions', []);
        this.set(model + 'SuggestionError', true);
        this._showDropdown(trigger);
      });

    }, 200));
  },

  validQuery: Ember.computed('customer.telephone', 'customer.addressOne', 'customer.addressTwo', 'customer.postcode', function() {
    return (this.get('customer.telephone') && this.get('customer.telephone').length > 2) ||
           (this.get('customer.addressOne') && this.get('customer.addressOne').length > 2) ||
           (this.get('customer.addressTwo') && this.get('customer.addressTwo').length > 2) ||
           (this.get('customer.postcode') && this.get('customer.postcode').length > 2);
  }),

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
        500));
    }
  }),

  queryDeliveryCustomer(customer) {
    let query = this.get('store').query('delivery-customer', customer);

    query.then(this._handleCustomerSearchResults.bind(this, query))
         .catch(this._handleFailedCustomerSearch.bind(this, query));

    this.set('latestQuery', query);
  },

  _showDropdown(trigger) {
    if (!trigger.parent().hasClass('show')) {
      trigger.dropdown('toggle');
    }
  },

  _hideDropdown(trigger) {
    if (trigger.parent().hasClass('show')) {
      trigger.dropdown('toggle');
    }
  },

  _handleCustomerSearchResults(query, customers) {
    if (query && query === this.get('latestQuery')) {
      this.set('deliveryCustomerResults', customers);
      this.set('debouncedSearch', null);
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
      this.set('debouncedSearch', null);
    }
  },

  actions: {

    setAddressTwo(addressTwo) {
      this._hideDropdown(this.$(ROAD_DROPDOWN_TRIGGER));
      this.set('dontSuggest', true);
      this.set('customer.addressTwo', addressTwo);
    },

    setPostcode(postcode) {
      this._hideDropdown(this.$(POSTCODE_DROPDOWN_TRIGGER));
      this.set('dontSuggest', true);
      this.set('customer.postcode', postcode);
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
