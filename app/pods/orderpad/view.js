import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement: function() {
    $(window).resize(this.get('onResize'));
    this.get('onResize')();
  },
  onResize: function() {
    $('#orderpad-menu').height($(window).height() - $('#orderpad-categories').outerHeight());
    $('#orderpad-order').outerHeight($(window).height() - ($('#orderpad-customer').outerHeight() + $('#orderpad-header').outerHeight() + 20)); //20 for margin
  }
});
