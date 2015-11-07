import Ember from 'ember';

export default Ember.Component.extend({

  didInsertElement() {
    //fire window.resize() to recalculate height of orderlist. See component/temp/orderpad-wrapper
    $(window).resize();
  }
});
