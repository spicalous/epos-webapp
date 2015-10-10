import Ember from 'ember';

/**
*
* Temporary component to remove view deprecations
*/
export default Ember.Component.extend({

  didInsertElement() {
    $(window).resize(this.get('onResize'));
    this.get('onResize')();
  },

  onResize() {
    $('#orderpad-menu').height($(window).height() -
        $('#orderpad-categories').outerHeight());
    $('#orderpad-orderlist').outerHeight($(window).height() - (
        $('#orderpad-header').outerHeight() +
        $('#orderpad-customer').outerHeight() +
        $('#orderpad-summary').outerHeight()));
  }

});
