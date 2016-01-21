import Ember from 'ember';

export default Ember.Component.extend({

  observeAndResize: Ember.observer('customer.invalidTelephone', 'customer.invalidName', function() {
    Ember.run.scheduleOnce('afterRender', this, function() {
      $(window).resize();
    });
  }),

  willDestroy() {
    $(window).resize();
  },

  didInsertElement() {
    $(window).resize();
  }

});
