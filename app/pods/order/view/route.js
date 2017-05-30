import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    // TODO: replace with proper solution
    // unload all items we save implicitly when sending an order to the back end so the store can start fresh
    this.store.unloadAll('takeaway-customer');

    return this.store.findAll('order/eat-out', { reload: true });
  }

});
