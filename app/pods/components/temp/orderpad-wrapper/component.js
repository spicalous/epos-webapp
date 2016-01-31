import Ember from 'ember';
import config from '../../../../config/environment';

/**
*
* Temporary component to remove view deprecations
*/
export default Ember.Component.extend({

  featureFlags: {
    NAV_BAR_ENABLED: config.APP.NAV_BAR_ENABLED
  },

  NAV_HEIGHT: 50,

  onResize() {
    let windowHeight = $(window).height();
    let windowWidth = $(window).width();

    if (this.get('featureFlags.NAV_BAR_ENABLED')) {
      this.notifyPropertyChange('NAV_HEIGHT'); //recalculate window.height
      windowHeight = windowHeight - this.get('NAV_HEIGHT');
    }

    if (windowWidth < 768) {
      $('#orderpad-menu').height(windowHeight - (
          16 + //menu inline padding in orderpad template style="padding:8px" id="orderpad-menu"
          $('#orderpad-customer-small').outerHeight() +
          $('#orderpad-categories').outerHeight()));
    } else {
      $('#orderpad-menu').height(windowHeight - (
          16 + //menu inline padding in orderpad template style="padding:8px" id="orderpad-menu"
          $('#orderpad-categories').outerHeight()));
      $('#orderpad-numpad').height(windowHeight -
          $('#orderpad-categories').outerHeight());
    }

    $('#orderpad-orderlist').outerHeight(windowHeight - (
        $('#orderpad-customer').outerHeight() +
        $('#orderpad-bottom').outerHeight()));
    $('#customer-browser-bottom').outerHeight(windowHeight -
        $('#customer-browser-top').outerHeight());
    $('#confirm-order-list').outerHeight(windowHeight - (
        $('#confirm-order-list-header').outerHeight() +
        $('#confirm-order-bottom').outerHeight()));
  },

  didInsertElement() {
    let _this = this;
    $(window).resize(function() {
      _this.get('onResize').call(_this);
    });
    this.get('onResize').call(this);
  }

});
