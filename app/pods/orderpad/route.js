import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return Ember.RSVP.hash({
      menu: this.store.findAll('menu-item'),
      categories: this.store.peekAll('category'),
      editCategories: this.store.peekAll('edit-category'),
      editOptions: this.store.peekAll('edit-option'),
      order: this.store.createRecord('order', {})
    });
  },

  setupController(controller, model) {
    controller.set('model', model);
    controller.set('menu', model.menu);
  },

  actions: {

    showCustomerBrowser() {
      this.render('customer-browser', {
        into: 'orderpad',
        outlet: 'customer-browser',
      });
    },

    hideCustomerSelect() {
      this.disconnectOutlet({
        outlet: 'customer-browser',
        parentView: 'orderpad'
      });
    }
  }
});
