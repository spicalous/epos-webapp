import Ember from 'ember';

export default Ember.Component.extend({

  observeAndUpdate: Ember.observer('name', 'contactNumber', function() {
    let name = this.get('name').trim();
    let contactNumber = this.get('contactNumber').trim();

    this.set('customer.name', name);
    this.set('customer.contactNumber', contactNumber);
  }),

  didInsertElement() {
    //fire window.resize() to recalculate height of orderlist. See component/temp/orderpad-wrapper
    $(window).resize();
    this.$('#takeaway-customerName').focus();
  }
});
