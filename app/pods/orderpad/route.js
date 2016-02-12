import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return Ember.RSVP.hash({
      menu: this.store.findAll('menu-item'),
      categories: this.store.peekAll('category'),
      editCategories: this.store.peekAll('edit-category'),
      editOptions: this.store.peekAll('edit-option'),
      order: this.store.createRecord('order'),
      customer: null
    });
  },

  setupController(controller, model) {
    controller.set('model', model);
    controller.set('menu', model.menu);
  },

  actions: {

    showCustomerBrowser() {
      this.controller.set('customerBrowserVisible', true);
      this.render('customer-browser', {
        into: 'orderpad',
        outlet: 'customer-browser',
      });

      Ember.run.scheduleOnce('afterRender', this, function() {
        Ember.$('#postcodeSuggestionDropdownTrigger').on('click tap', function(e) {
          e.stopImmediatePropagation();
        });
        Ember.$('#addressSuggestionDropdownTrigger').on('click tap', function(e) {
          e.stopImmediatePropagation();
        });
      });
    },

    hideCustomerBrowser() {
      this.controller.set('customerBrowserVisible', false);
      this.disconnectOutlet({
        outlet: 'customer-browser',
        parentView: 'orderpad'
      });
    },

    showConfirmOrder() {
      Ember.$('#orderpad-modal').modal('hide');

      this.render('confirm-order', {
        into: 'orderpad',
        outlet: 'confirm-order',
      });

      Ember.run.scheduleOnce('afterRender', this, () => Ember.$(window).resize());
    },

    hideConfirmOrder() {
      this.disconnectOutlet({
        outlet: 'confirm-order',
        parentView: 'orderpad'
      });
    }

  }
});
