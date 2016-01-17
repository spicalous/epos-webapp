import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  contactNumber: DS.attr('string'),
  customerType: Ember.computed.alias('constructor.modelName'),

  invalidTelephone: Ember.computed('invalidTelephoneReason', function() {
    return !!this.get('invalidTelephoneReason');
  }),

  invalidTelephoneReason: Ember.computed('contactNumber', function() {
    let contactNumber = this.get('contactNumber');

    if (!contactNumber) {
      return "Telephone number must not be empty.";
    }
    if (!contactNumber.trim()) {
      return "Telephone number must not be empty.";
    }
    if (contactNumber.length < 11) {
      return "Telephone number too short.";
    }
    if (contactNumber.length > 11) {
      return "Telephone number too long.";
    }
    return "";
  })

});
