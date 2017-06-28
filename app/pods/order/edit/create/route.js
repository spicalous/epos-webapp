import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.store.createRecord('order');
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('menu', this.modelFor('order/edit'));
  }

});
