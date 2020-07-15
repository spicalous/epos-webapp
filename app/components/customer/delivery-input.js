import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { cancel, debounce } from '@ember/runloop';
import { inject as service } from '@ember/service';
import Ember from 'ember';

const SUGGEST_DEBOUNCE = 200;

export default class CustomerDeliveryInputComponent extends Component {

  @service store;

  @tracked telephone = '';
  @tracked addressOne = '';
  @tracked road = '';
  @tracked postcode = '';
  @tracked roadSearchResults = null;
  @tracked postcodeSearchResults = null;

  constructor() {
    super(...arguments);
    if (this.args.telephone) {
      this.telephone = this.args.telephone;
    }
    if (this.args.addressOne) {
      this.addressOne = this.args.addressOne;
    }
    if (this.args.road) {
      this.road = this.args.road;
    }
    if (this.args.postcode) {
      this.postcode = this.args.postcode;
    }
  }

  @action
  onTelephoneInput(inputEvent) {
    this.telephone = inputEvent.target.value.trim();
    this._onChange();
  }

  @action
  onAddressOneInput(inputEvent) {
    this.addressOne = inputEvent.target.value.trim();
    this._onChange();
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
    this._onChange();
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
    this._onChange();
  }

  @action
  setRoadFromSuggestion(value) {
    this.road = value;
    this.roadSearchResults = null;
    this._onChange();
  }

  @action
  setPostcodeFromSuggestion(value) {
    this.postcode = value;
    this.postcodeSearchResults = null;
    this._onChange();
  }

  _suggestion(modelName, query, propertyName) {
    this.store.query(modelName, query)
      .then(response => {
        this[`${modelName}SearchResults`] = response.map(model => model[propertyName]);
      })
      .catch(error => console.error(`Failed to query ${modelName}`, error));
  }

  _onChange() {
    if (this.args.onChange) {
      this.args.onChange(this.telephone, this.addressOne, this.road, this.postcode);
    }
  }

}
