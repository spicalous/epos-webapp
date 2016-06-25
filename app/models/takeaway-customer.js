import Ember from 'ember';
import Customer from './customer';
import attr from 'ember-data/attr';

export default Customer.extend({
  name: attr('string', { defaultValue: '' }),

  /**
   *  For take away customers - telephone is not required if empty
   *  @override
   */
  invalidTelephone: Ember.computed('invalidTakeAwayTelephoneReason', function() {
    return !!this.get('invalidTakeAwayTelephoneReason');
  }),

  invalidTakeAwayTelephoneReason: Ember.computed('telephone', function() {
    let telephone = this.get('telephone');

    return (!telephone || !telephone.trim()) ? '' : this.get('invalidTelephoneReason');
  })

});
