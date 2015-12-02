import Ember from 'ember';

export default Ember.Component.extend({

  willDestroy() {
    $(window).resize();
  },

  didInsertElement() {
    $(window).resize();
    this.$('#takeaway-customerName').focus();
  }

});
