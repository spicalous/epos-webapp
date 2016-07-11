import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return Ember.RSVP.hash({
      menu: this.store.findAll('menu-item'),
      categories: this.store.peekAll('category'),
      editCategories: this.store.peekAll('edit-category'),
      editOptions: this.store.peekAll('edit-option'),
      order: this.store.createRecord('order')
    });
  },

  handleResize() {
    let windowHeight = Ember.$(window).height();
    let windowWidth = Ember.$(window).width();

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
    Ember.$('.customer-browser_bottom').outerHeight(windowHeight -
        Ember.$('.customer-browser_top').outerHeight());
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
