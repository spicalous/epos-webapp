import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('delivery-customer', params.delivery_customer_id);
  }
});
