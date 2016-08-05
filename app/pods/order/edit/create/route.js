import Ember from 'ember';
const MAX_MOBILE_WIDTH = 767;

export default Ember.Route.extend({

  model() {
    return Ember.RSVP.Promise.resolve();
  },

  renderTemplate(controller, model) {
    this._super(controller, model);
    this.render('create-order-customer-selector', {
      outlet: 'top-container'
    });
    this.render('modal-toggle-btn', {
      outlet: 'float-bottom-container'
    });
  },

  handleResize() {
    let windowHeight = Ember.$(window).height();
    let windowWidth = Ember.$(window).width();
    let confirmHeader = Ember.$('.order-edit-create__confirm-order-header').outerHeight();
    let confirmFooter = Ember.$('.order-edit-create__confirm-order-footer').outerHeight();

    if (MAX_MOBILE_WIDTH < windowWidth) {
      let customerHeight = Ember.$('.order-edit-create__customer').outerHeight();
      let orderDetails = Ember.$('.order-edit-create__details').outerHeight();
      let orderActions = Ember.$('.order-edit-create__actions').outerHeight();

      Ember.$('.order-edit-create__order').outerHeight(windowHeight -
        (customerHeight + orderDetails + orderActions));
    }
    Ember.$('.order-edit-create__confirm-order-body').outerHeight(windowHeight -
        (confirmHeader + confirmFooter));

  },

  bindResize: Ember.on('init', function() {
    Ember.$(window).on('resize', Ember.run.bind(this, this.handleResize));
  }),

  actions: {

    didTransition() {
      Ember.run.scheduleOnce('afterRender', this, this.handleResize);
      return true; //bubble
    }

  }
});
