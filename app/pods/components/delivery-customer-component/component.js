import Ember from 'ember';

export default Ember.Component.extend({

  invalidTelephone: Ember.computed('customer.contactNumber', function() {
    return this.get('customer.contactNumber').length !== 11;
  }),

});
