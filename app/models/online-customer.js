import Customer from './customer';
import Ember from 'ember';
import attr from 'ember-data/attr';

export default Customer.extend({
  orderId: attr('string', { defaultValue: '' }),

  /**
   *  Telephone is not required for online customers
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
