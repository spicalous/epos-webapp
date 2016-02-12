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
    let windowHeight = Ember.$(window).height();
    let windowWidth = Ember.$(window).width();

    if (this.get('featureFlags.NAV_BAR_ENABLED')) {
      this.notifyPropertyChange('NAV_HEIGHT'); //recalculate window.height
      windowHeight = windowHeight - this.get('NAV_HEIGHT');
    }

    if (windowWidth < 768) {
      Ember.$('#orderpad-menu').height(windowHeight - (
          16 + //menu inline padding in orderpad template style="padding:8px" id="orderpad-menu"
          Ember.$('#orderpad-customer-small').outerHeight() +
          Ember.$('#orderpad-categories').outerHeight()));
    } else {
      Ember.$('#orderpad-menu').height(windowHeight - (
          16 + //menu inline padding in orderpad template style="padding:8px" id="orderpad-menu"
          Ember.$('#orderpad-categories').outerHeight()));
      Ember.$('#orderpad-numpad').height(windowHeight -
          Ember.$('#orderpad-categories').outerHeight());
    }

    Ember.$('#orderpad-orderlist').outerHeight(windowHeight - (
        Ember.$('#orderpad-customer').outerHeight() +
        Ember.$('#orderpad-bottom').outerHeight()));
    Ember.$('#customer-browser-bottom').outerHeight(windowHeight -
        Ember.$('#customer-browser-top').outerHeight());
    Ember.$('#confirm-order-list').outerHeight(windowHeight - (
        Ember.$('#confirm-order-list-header').outerHeight() +
        Ember.$('#confirm-order-bottom').outerHeight()));
  },

  didInsertElement() {
    let _this = this;
    Ember.$(window).resize(function() {
      _this.get('onResize').call(_this);
    });
    this.get('onResize').call(this);
  }

});
