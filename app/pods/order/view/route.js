import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    // TODO: replace with proper solution ID:1829 (use this to search other todos)
    // unload all takeaway customers so the store can start fresh with
    // takeaway customer - order relationships
    this.store.unloadAll('takeaway-customer');

    return this.store.findAll('order/eat-out', { reload: true });
  }

});
