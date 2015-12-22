import Ember from 'ember';

/**
*
* Temporary component to remove view deprecations
*/
export default Ember.Component.extend({

  NAV_HEIGHT: 50,

  visibleWindowHeight: Ember.computed('NAV_HEIGHT', function() {
    return $(window).height() - this.get('NAV_HEIGHT');
  }),

  onResize() {
    this.notifyPropertyChange('NAV_HEIGHT'); //recalculate window.height
    $('#orderpad-menu').height(this.get('visibleWindowHeight') -
        $('#orderpad-categories').outerHeight());
    $('#orderpad-orderlist').outerHeight(this.get('visibleWindowHeight') - (
        $('#orderpad-header').outerHeight() +
        $('#orderpad-customer').outerHeight() +
        $('#orderpad-bottom').outerHeight()));
    $('#customer-browser-bottom').outerHeight($('.customer-browser').height() - (
        30 +
        $('.customer-browser .modal-header').outerHeight() +
        $('#customer-browser-top').outerHeight()));
  },

  didInsertElement() {
    let _this = this;
    $(window).resize(function() {
      _this.get('onResize').call(_this);
    });
    this.get('onResize').call(this);
  }

});
