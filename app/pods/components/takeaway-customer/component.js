import Ember from 'ember';

export default Ember.Component.extend({

  observeAndUpdate: function() {
    let name = this.get('name').trim();
    this.set('customer.name', name);
  }.observes('name'),

  didInsertElement() {
    //fire window.resize() to recalculate height of orderlist. See component/temp/orderpad-wrapper
    $(window).resize();
  }
});
