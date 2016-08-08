import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.store.findAll('order/eat-out', { reload: true });
  }

});
