import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.store.findAll('order/eat-out', { reload: true });
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('ordersToDisplay', model);
  },

});
