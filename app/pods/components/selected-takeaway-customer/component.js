import Ember from 'ember';

export default Ember.Component.extend({

  observeAndResize: Ember.observer('customer.invalidTelephone', 'customer.invalidName', function() {
    Ember.run.scheduleOnce('afterRender', this, () => Ember.$(window).resize());
  }),

  willDestroy() {
    Ember.$(window).resize();
  },

  didInsertElement() {
    Ember.$(window).resize();
  }

});
