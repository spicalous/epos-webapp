import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { cancel, debounce } from '@ember/runloop';
import { action } from '@ember/object';
import { empty } from '@ember/object/computed';
import { validate } from './../../models/customer/delivery';
import Ember from 'ember';

const SUGGEST_DEBOUNCE = 200;
const QUERY_DEBOUNCE = 450;

export default class CustomerSelectDeliverySelectComponent extends Component {

  @service store;
  @service ui;

  @tracked telephone = '';
  @tracked addressOne = '';
  @tracked road = '';
  @tracked postcode = '';

  @tracked searching = false;
  @tracked deliveryCustomerSearchResults = null;
  @tracked roadSearchResults;
  @tracked postcodeSearchResults;

  @empty('deliveryCustomerSearchResults')
  emptySearchResults;

  get invalidCustomerReason() {
    return validate(this.telephone, this.addressOne, this.road, this.postcode);
  }

  get canSave() {
    return !this.invalidCustomerReason
      && !this.searching
      && this.emptySearchResults;
  }

  get validQuery() {
    return (this.telephone && this.telephone.trim().length > 2)
      || (this.addressOne && this.addressOne.trim().length > 2)
      || (this.road && this.road.trim().length > 2)
      || (this.postcode && this.postcode.trim().length > 2);
  }

  @action
  onTelephoneInput(inputEvent) {
    this.telephone = inputEvent.target.value.trim();
    this._queryIfValid();
  }

  @action
  onAddressOneInput(inputEvent) {
    this.addressOne = inputEvent.target.value.trim();
    this._queryIfValid();
  }

  @action
  onRoadInput(inputEvent) {
    this.road = inputEvent.target.value.trim();
    if (this.road && this.road.trim().length >= 2) {
      cancel(this.debouncedRoadSearch);
      this.debouncedRoadSearch = debounce(this, '_suggestion', 'road', { name: this.road }, 'name', Ember.testing ? 1 : SUGGEST_DEBOUNCE);
    } else {
      this.roadSearchResults = null;
    }
    this._queryIfValid();
  }

  @action
  onPostcodeInput(inputEvent) {
    this.postcode = inputEvent.target.value.trim();
    if (this.postcode && this.postcode.trim().length >= 2) {
      cancel(this.debouncedPostcodeSearch);
      this.debouncedPostcodeSearch = debounce(this, '_suggestion', 'postcode', { postcode: this.postcode }, 'postcode', Ember.testing ? 1 : SUGGEST_DEBOUNCE);
    } else {
      this.postcodeSearchResults = null;
    }
    this._queryIfValid();
  }

  @action
  setRoadFromSuggestion(value) {
    this.road = value;
    this.roadSearchResults = null;
    this._queryIfValid();
  }

  @action
  setPostcodeFromSuggestion(value) {
    this.postcode = value;
    this.postcodeSearchResults = null;
    this._queryIfValid();
  }

  _suggestion(modelName, query, propertyName) {
    this.store.query(modelName, query)
      .then(response => {
        this[`${modelName}SearchResults`] = response.map(model => model[propertyName]);
      })
      .catch(error => console.error(`Failed to query ${modelName}`, error));
  }

  _queryIfValid() {
    if (this.validQuery) {
      this.searching = true;
      this.debouncedSearch = debounce(this, '_query', Ember.testing ? 1 : QUERY_DEBOUNCE);
    } else {
      cancel(this.debouncedSearch);
    }
  }

  _query() {
    let query = { telephone: this.telephone, addressOne: this.addressOne, road: this.road, postcode: this.postcode };
    this.latestQueryTimestamp = Date.now();
    this.store.query('customer/delivery', query)
      .then(this._handleCustomerDeliveryQuerySuccess.bind(this, this.latestQueryTimestamp))
      .catch(this._handleCustomerDeliveryQueryFailed.bind(this, this.latestQueryTimestamp));
  }

  _handleCustomerDeliveryQuerySuccess(timestamp, customers) {
    if (this.latestQueryTimestamp == timestamp) {
      this.deliveryCustomerSearchResults = customers;
      this.searching = false;
    }
  }

  _handleCustomerDeliveryQueryFailed(timestamp, error) {
    console.error('Failed to query customer/delivery', error);
    if (this.latestQueryTimestamp == timestamp) {
      this.searching = false;
      this.ui.showAppOverlay(
        'Search failed :(',
        error && error.errors && error.errors[0] && error.errors[0].detail || error.message || 'Unknown error');
    }
  }

}
