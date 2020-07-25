import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { cancel, debounce } from '@ember/runloop';
import { inject as service } from '@ember/service';
import Ember from 'ember';

const QUERY_DEBOUNCE = 450;

export default class CustomerDeliverySearchComponent extends Component {

  @service store;

  @tracked searching = false;
  @tracked deliveryCustomerSearchResults = null;

  _validQuery(telephone, addressOne, road, postcode) {
    return (telephone && telephone.trim().length > 2)
      || (addressOne && addressOne.trim().length > 2)
      || (road && road.trim().length > 2)
      || (postcode && postcode.trim().length > 2);
  }

  @action
  onChange(telephone, addressOne, road, postcode) {
    if (this.args.onChange) {
      this.args.onChange(telephone, addressOne, road, postcode);
    }

    if (this._validQuery(telephone, addressOne, road, postcode)) {
      this.searching = true;
      this.debouncedSearch = debounce(this, '_query', telephone, addressOne, road, postcode, Ember.testing ? 1 : QUERY_DEBOUNCE);
    } else {
      cancel(this.debouncedSearch);
    }
  }

  _query(telephone, addressOne, road, postcode) {
    this.latestQueryTimestamp = Date.now();
    this.store.query('customer/delivery', { telephone, addressOne, road, postcode, include: 'deliveryCustomerTags' })
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
      this.args.onCustomerSearchError(
        'Search failed :(',
        error && error.errors && error.errors[0] && error.errors[0].detail || error.message || 'Unknown error');
    }
  }

}
