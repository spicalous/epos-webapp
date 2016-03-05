import Ember from 'ember';
import config from '../../config/environment';

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

  NAV_HEIGHT: 50,

  handleResize() {
    const NAV_BAR_ENABLED = config.APP.NAV_BAR_ENABLED;
    let windowHeight = Ember.$(window).height();
    let windowWidth = Ember.$(window).width();

    if (NAV_BAR_ENABLED) {
      this.notifyPropertyChange('NAV_HEIGHT'); //recalculate window.height
      windowHeight = windowHeight - this.get('NAV_HEIGHT');
    }

    if (windowWidth < 768) {
      Ember.$('#orderpad-menu').height(windowHeight - (
          16 + //menu inline padding in orderpad template style="padding:8px" id="orderpad-menu"
          Ember.$('#orderpad-customer-small').outerHeight() +
          Ember.$('#orderpad-categories').outerHeight()));
    } else {
      Ember.$('#orderpad-menu').height(windowHeight - (
          16 + //menu inline padding in orderpad template style="padding:8px" id="orderpad-menu"
          Ember.$('#orderpad-categories').outerHeight()));
      Ember.$('#orderpad-numpad').height(windowHeight -
          Ember.$('#orderpad-categories').outerHeight());
    }

    Ember.$('#orderpad-orderlist').outerHeight(windowHeight - (
        Ember.$('#orderpad-customer').outerHeight() +
        Ember.$('#orderpad-bottom').outerHeight()));
    Ember.$('#customer-browser-bottom').outerHeight(windowHeight -
        Ember.$('#customer-browser-top').outerHeight());
    Ember.$('#confirm-order-list').outerHeight(windowHeight - (
        Ember.$('#confirm-order-list-header').outerHeight() +
        Ember.$('#confirm-order-bottom').outerHeight()));
  },

  bindResize: Ember.on('init', function() {
    Ember.$(window).on('resize', Ember.run.bind(this, this.handleResize));
  }),

  actions: {

    didTransition() {
      Ember.run.scheduleOnce('afterRender', this, () => this.handleResize());
    },

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

      Ember.run.scheduleOnce('afterRender', this, () => this.handleResize());
    },

    hideConfirmOrder() {
      this.disconnectOutlet({
        outlet: 'confirm-order',
        parentView: 'orderpad'
      });
    }

  }
});
