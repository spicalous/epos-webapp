import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return Ember.RSVP.hash({
      menu: this.store.findAll('menu-item'),
      categories: this.store.findAll('category'),
      editCategories: this.store.findAll('edit-category'),
      editOptions: this.store.findAll('edit-option')
    });
  },

  setupController(controller, model) {
    this._super(controller, model);

    controller.set('focusOrderIdField', true);

    controller._prepareOrder = function() {
      let order = this.get('store').createRecord('order/eatOut');

      order.setProperties({
        dateTime: new Date(),
        orderItems: this.get('items'),
        paymentMethod: this.get('paymentMethod'),
        notes: this.get('notes'),
        customer: this.get('customer'),
        estimatedTime: this.get('estimatedTime')
      });

      return order;
    };

    controller.onSubmitOrder = null;
    controller.onCancelOrder = null;
  }

});
