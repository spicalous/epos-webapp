import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  contactNumber: DS.attr('string'),
  customerType: Ember.computed.alias('constructor.modelName'),

  invalidTelephone: Ember.computed('invalidTelephoneReason', function() {
    return !!this.get('invalidTelephoneReason');
  }),

  invalidTelephoneReason: Ember.computed('contactNumber', function() {
    let customerType = this.get('customerType');
    let contactNumber = this.get('contactNumber');

    if (!contactNumber) {
      return (customerType === 'takeaway-customer') ?
      '' :
      'Telephone number required.';
    }
    if (!contactNumber.trim()) {
      return 'Telephone number required.';
    }
    if (contactNumber.length < 11) {
      return 'Telephone number is too short.';
    }
    if (contactNumber.length > 11) {
      return 'Telephone number is too long.';
    }
    return '';
  })

});
