import Customer from 'talaythai-webapp/models/customer';
import DS from 'ember-data';
import Ember from 'ember';


export default Customer.extend({
  addressOne: DS.attr('string'),
  addressTwo: DS.attr('string'),
  postcode: DS.attr('string'),

  address: Ember.computed('addressOne', 'addressTwo', function() {
    let addressOne = this.get('addressOne');
    let addressTwo = this.get('addressTwo');

    return addressOne ?
        addressOne + (addressTwo ? ' ' + addressTwo : '') :
        addressTwo;
  }),

  invalidAddress: Ember.computed('invalidAddressReason', function() {
    return !!this.get('invalidAddressReason');
  }),

  invalidPostcode: Ember.computed('invalidPostcodeReason', function() {
    return !!this.get('invalidPostcodeReason');
  }),

  invalidAddressReason: Ember.computed('address', function() {
    let addressOne = this.get('addressOne');
    let addressTwo = this.get('addressTwo');

    if (!(addressOne.trim() + addressTwo.trim())) {
      return "Address must not be empty.";
    }
    if (addressOne.length > 100 || addressTwo.length > 100) {
      return "Address must not be more than 100 characters.";
    }
    return "";
  }),

  invalidPostcodeReason: Ember.computed('postcode', function() {
    let postcode = this.get('postcode');

    if (postcode && postcode.length > 10) {
      return "Postcode not be more than 10 characters.";
    }
    return "";
  }),
});
