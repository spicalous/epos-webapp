import { computed } from '@ember/object';
import Customer from 'epos-webapp/models/customer';
import attr from 'ember-data/attr';

export default Customer.extend({
  addressOne: attr('string', { defaultValue: '' }),
  addressTwo: attr('string', { defaultValue: '' }),
  postcode: attr('string', { defaultValue: '' }),

  address: computed('addressOne', 'addressTwo', function() {
    let addressOne = this.get('addressOne') ? this.get('addressOne').trim() : '';
    let addressTwo = this.get('addressTwo') ? this.get('addressTwo').trim() : '';

    return addressOne ?
        addressOne + (addressTwo ? ' ' + addressTwo : '') :
        addressTwo;
  }),

  invalidAddress: computed('invalidAddressReason', function() {
    return !!this.get('invalidAddressReason');
  }),

  invalidPostcode: computed('invalidPostcodeReason', function() {
    return !!this.get('invalidPostcodeReason');
  }),

  invalidAddressReason: computed('addressOne', 'addressTwo', function() {
    let addressOne = this.get('addressOne');
    let addressTwo = this.get('addressTwo');

    if (!this.get('address')) {
      return 'Address required.';
    }
    if ((addressOne && addressOne.length > 100) || (addressTwo && addressTwo.length > 100)) {
      return 'Address must not be more than 100 characters.';
    }
    return '';
  }),

  invalidPostcodeReason: computed('postcode', function() {
    let postcode = this.get('postcode');

    if (postcode && postcode.length > 10) {
      return 'Postcode must not be more than 10 characters.';
    }
    return '';
  })

});
