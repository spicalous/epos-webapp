import Customer from 'talaythai-webapp/models/customer';
import DS from 'ember-data';
import Ember from 'ember';


export default Customer.extend({
  address: DS.attr('string'),
  postcode: DS.attr('string'),

  invalidAddress: Ember.computed('invalidAddressReason', function() {
    return !!this.get('invalidAddressReason');
  }),

  invalidPostcode: Ember.computed('invalidPostcodeReason', function() {
    return !!this.get('invalidPostcodeReason');
  }),

  invalidAddressReason: Ember.computed('address', function() {
    let address = this.get('address');

    if (!address.trim()) {
      return "Address must not be empty.";
    }
    if (address.length > 100) {
      return "Address not be more than 100 characters.";
    }
    return "";
  }),

  invalidPostcodeReason: Ember.computed('postcode', function() {
    let postcode = this.get('postcode');

    if (!postcode.trim()) {
      return "Postcode must not be empty.";
    }
    if (postcode.length > 10) {
      return "Postcode not be more than 10 characters.";
    }
    return "";
  }),
});
