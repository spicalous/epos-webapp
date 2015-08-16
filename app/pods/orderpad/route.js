import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({
      menu: this.store.findAll('menu-item'),
      categories: this.store.peekAll('category'),
      editOptions: this.store.peekAll('edit-option'),
      order: this.store.createRecord('order', {})
    });
  },
  setupController: function(controller, model) {
    controller.set('model', model);
    controller.set('menu', model.menu);
  },
  actions: {
    showCustomerSelect: function() {
      this.render('customer-select', {
        into: 'orderpad',
        outlet: 'customer-select',
      });
    }
  }
});
