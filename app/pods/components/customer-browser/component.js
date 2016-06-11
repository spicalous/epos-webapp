import Ember from 'ember';

export default Ember.Component.extend({

  didInsertElement() {
    Ember.run.scheduleOnce('afterRender', this, function() {
      Ember.$('#postcodeSuggestionDropdownTrigger').on('click tap', (event) => event.stopImmediatePropagation());
      Ember.$('#addressSuggestionDropdownTrigger').on('click tap', (event) => event.stopImmediatePropagation());
    });
  },

  canSaveCustomer: Ember.computed('validCustomer', 'emptySearchResults', 'debouncedSearch', function() {
    return this.get('validCustomer') && this.get('emptySearchResults') && !this.get('debouncedSearch');
  }),

  hasCustomerQuery: Ember.computed('customer.telephone', 'customer.addressOne', 'customer.addressTwo', 'customer.postcode', function() {
    return (this.get('customer.telephone') && this.get('customer.telephone').length > 2) ||
           (this.get('customer.addressOne') && this.get('customer.addressOne').length > 2) ||
           (this.get('customer.addressTwo') && this.get('customer.addressTwo').length > 2) ||
           (this.get('customer.postcode') && this.get('customer.postcode').length > 2);
  }),

  emptySearchResults: Ember.computed.empty('deliveryCustomerResults'),

  /**
   * @param {HTMLElement} dropdownTrigger  - element responsible for triggering the
   *                                         bootstrap dropdown for suggestion
   * @param {string} debounceId            - id for debounce handling
   * @param {string} model                 - model name for query
   * @param {object} query                 - query params
   * @param {function} valid               - execute search if valid() evaluates true
   * @param {string} blockingFlag          - if this property on the controller is true
   *                                         then don't search and set flag to false
   */
  suggestionSearch(dropdownTrigger, debounceId, model, query, valid, blockingFlag) {
    Ember.run.cancel(this.get(debounceId));

    if (this.get(blockingFlag)) {
      this.set(blockingFlag, false);
      return;
    }

    if (valid()) {

      this.set(debounceId, Ember.run.debounce(this, () => {

        this.store.query(model, query).then((roads) => {
          this.set(debounceId, '');
          this.set(model + 'Suggestions', roads);
          this.set(model + 'SuggestionError', false);
          if (!dropdownTrigger.parent().hasClass('open')) {
            dropdownTrigger.dropdown('toggle');
          }
        }).catch(() => {
          this.set(debounceId, '');
          this.set(model + 'Suggestions', []);
          this.set(model + 'SuggestionError', true);
          if (!dropdownTrigger.parent().hasClass('open')) {
            dropdownTrigger.dropdown('toggle');
          }
        });

      }, 100));
    } else {
      dropdownTrigger.parent().removeClass('open');
    }
  },

  roadSuggestionSearch: Ember.observer('customer', 'customer.addressTwo', function() {
    const trigger = Ember.$('#addressSuggestionDropdownTrigger');
    const debounceId = 'debouncedAddressTwoSuggestion';
    let addressTwo = this.get('customer.addressTwo') ? this.get('customer.addressTwo').trim() : '';

    this.suggestionSearch(trigger, debounceId, 'road', { road: addressTwo }, () => addressTwo && addressTwo.length > 1, 'dontSuggestRoad');
  }),

  postcodeSuggestionSearch: Ember.observer('customer', 'customer.postcode', function() {
    const trigger = Ember.$('#postcodeSuggestionDropdownTrigger');
    const debounceId = 'debouncedPostcodeSuggestion';
    let postcode = this.get('customer.postcode') ? this.get('customer.postcode').trim() : '';

    this.suggestionSearch(trigger, debounceId, 'postcode', { postcode: postcode }, () => postcode && postcode.length > 1, 'dontSuggestPostcode');
  }),

  customerSearch: Ember.observer('customer', 'customer.telephone', 'customer.addressOne', 'customer.addressTwo', 'customer.postcode', function() {
    let telephone = this.get('customer.telephone') ? this.get('customer.telephone').trim() : '';
    let addressOne = this.get('customer.addressOne') ? this.get('customer.addressOne').trim() : '';
    let addressTwo = this.get('customer.addressTwo') ? this.get('customer.addressTwo').trim() : '';
    let postcode = this.get('customer.postcode') ? this.get('customer.postcode').trim() : '';

    Ember.run.cancel(this.get('debouncedSearch'));

    if ((addressOne.length > 2) || (addressTwo.length > 2) || (postcode.length > 2) || (telephone.length > 2)) {

      this.set('debouncedSearch', Ember.run.debounce(this, () => {
        this.store.query('delivery-customer', {
          addressOne: addressOne,
          addressTwo: addressTwo,
          postcode: postcode,
          telephone: telephone
        }).then((customers) => {
          this.set('deliveryCustomerResults', customers);
          this.set('debouncedSearch', '');
        }).catch((response) => {
          this.set('debouncedSearch', '');
          this.send('showMessage', 'overlay', {
            header: 'Error searching for customers :(',
            body: response.errors[0].message
          });
        });
      }, 1500));

    } else {
      this.set('deliveryCustomerResults', []);
      this.set('debouncedSearch', '');
    }
  }),

  actions: {

    cancel() {
      this.get('cancel')();
    },

    setAddressTwo(addressTwo) {
      const dropdownTrigger = Ember.$('#addressSuggestionDropdownTrigger');
      dropdownTrigger.parent().removeClass('open');

      this.set('dontSuggestRoad', true);
      this.set('customer.addressTwo', addressTwo);
    },

    setPostcode(postcode) {
      const dropdownTrigger = Ember.$('#postcodeSuggestionDropdownTrigger');
      dropdownTrigger.parent().removeClass('open');

      this.set('dontSuggestPostcode', true);
      this.set('customer.postcode', postcode);
    },

    selectCustomer(customer) {
      this.get('onCustomerSelected')(customer);
    },

    saveAndSelectCustomer() {
      this.get('onCustomerSave')();
    },

  }

});
