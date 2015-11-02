import Ember from 'ember';

export default Ember.Component.extend({

  observeAndUpdate: Ember.observer('name', function() {
    let name = this.get('name').trim();
    this.set('customer.name', name);
  }),

  didInsertElement() {
    //fire window.resize() to recalculate height of orderlist. See component/temp/orderpad-wrapper
    $(window).resize();
  }
});
