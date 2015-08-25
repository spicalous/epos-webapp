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
    $('#orderpad-menu').height($(window).height() - $('#orderpad-categories').outerHeight());
    $('#orderpad-order').outerHeight($(window).height() - ($('#orderpad-customer').outerHeight() + $('#orderpad-header').outerHeight() + 20)); //20 for margin
  }

});
