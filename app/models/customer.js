import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  telephone: DS.attr('string'),
  customerType: Ember.computed.alias('constructor.modelName'),

  invalidTelephone: Ember.computed('invalidTelephoneReason', function() {
    return !!this.get('invalidTelephoneReason');
  }),

  invalidTelephoneReason: Ember.computed('telephone', function() {
    let customerType = this.get('customerType');
    let telephone = this.get('telephone');

    if (!telephone) {
      return (customerType === 'takeaway-customer') ?
      '' :
      'Telephone number required.';
    }
    if (!telephone.trim()) {
      return 'Telephone number required.';
    }
    if (telephone.length < 11) {
      return 'Telephone number is too short.';
    }
    if (telephone.length > 11) {
      return 'Telephone number is too long.';
    }
    return '';
  })

});
