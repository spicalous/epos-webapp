import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return Ember.RSVP.hash({
      menu: this.store.findAll('menu-item'),
      categories: this.store.peekAll('category'),
      editCategories: this.store.peekAll('edit-category'),
      editOptions: this.store.peekAll('edit-option'),
      order: this.store.createRecord('order', {}),
      customer: null
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

    hideCustomerBrowser() {
      this.disconnectOutlet({
        outlet: 'customer-browser',
        parentView: 'orderpad'
      });
    },

    showConfirmOrder() {
      $('#orderpad-modal').modal('hide');

      this.render('confirm-order', {
        into: 'orderpad',
        outlet: 'confirm-order',
      });

      Ember.run.scheduleOnce('afterRender', this, function() {
        $(window).resize();
      });
    },

    hideConfirmOrder() {
      this.disconnectOutlet({
        outlet: 'confirm-order',
        parentView: 'orderpad'
      });
    }

  }
});
