import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  telephone: DS.attr('string', { defaultValue: '' }),

  invalidTelephone: Ember.computed('invalidTelephoneReason', function() {
    return !!this.get('invalidTelephoneReason');
  }),

  invalidTelephoneReason: Ember.computed('telephone', function() {
    let telephone = this.get('telephone');

    if (!telephone || !telephone.trim()) {
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
