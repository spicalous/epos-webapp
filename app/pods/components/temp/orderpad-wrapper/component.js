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

    if (this.get('featureFlags.NAV_BAR_ENABLED')) {
      this.notifyPropertyChange('NAV_HEIGHT'); //recalculate window.height
      windowHeight = windowHeight - this.get('NAV_HEIGHT');
    }

    $('#orderpad-menu').height(windowHeight -
        $('#orderpad-categories').outerHeight());
    $('#orderpad-orderlist').outerHeight(windowHeight - (
        $('#orderpad-customer').outerHeight() +
        $('#orderpad-bottom').outerHeight()));
    $('#customer-browser-bottom').outerHeight(windowHeight -
        $('#customer-browser-top').outerHeight());
  },

  didInsertElement() {
    let _this = this;
    $(window).resize(function() {
      _this.get('onResize').call(_this);
    });
    this.get('onResize').call(this);
  }

});
