import Ember from 'ember';

export default Ember.Component.extend({

  name: Ember.computed('nameRaw', function() {
    return this.get('nameRaw') ? this.get('nameRaw').trim() : '';
  }),

  contactNumber: Ember.computed('contactNumberRaw', function() {
    return this.get('contactNumberRaw') ? this.get('contactNumberRaw').trim() : '';
  }),

  observeAndUpdate: Ember.observer('nameRaw', 'contactNumberRaw', function() {
    this.set('customer.name', this.get('name'));
    this.set('customer.contactNumber', this.get('contactNumber'));
  }),

  willDestroy() {
    $(window).resize();
  },

  didInsertElement() {
    $(window).resize();
    this.$('#takeaway-customerName').focus();
  }

});
