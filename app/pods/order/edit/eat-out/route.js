import Ember from 'ember';

export default Ember.Route.extend({

  model(params) {
    return this.store.findRecord('order/eat-out', params['eat-out_id']);
  },

  setupController(controller, model) {
    this._super(controller, model);
    let editController = this.controllerFor('order/edit');

    editController.set('items', model.get('orderItems'));
    editController.set('customer', model.get('customer'));
    editController.set('paymentMethod', model.get('paymentMethod'));
    editController.set('notes', model.get('notes'));
    editController.set('estimatedTime', model.get('estimatedTime'));
    editController.set('focusOrderIdField', false);

    editController._prepareOrder = function() {

      // https://github.com/emberjs/data/issues/5109
      model.set('orderItems', this.get('items').toArray());
      model.setProperties({
        customer: this.get('customer'),
        paymentMethod: this.get('paymentMethod'),
        notes: this.get('notes'),
        estimatedTime: this.get('estimatedTime')
      });

      return model;
    };

    editController.onSubmitOrder = function() {
      this.transitionToRoute('order.view');
    };

    editController.onCancelOrder = function() {
      this.transitionToRoute('order.view');
      model.get('orderItems').invoke('rollbackAttributes');
    };
  }

});
