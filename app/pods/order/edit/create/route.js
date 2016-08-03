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

  handleCreateResize() {
    console.log("resized");
    let windowHeight = Ember.$(window).height();
    let windowWidth = Ember.$(window).width();
    let customerHeight = Ember.$('.order-edit__create-customer').outerHeight();
    let orderDetails = Ember.$('.order-edit__create-details').outerHeight();
    let orderActions = Ember.$('.order-edit__create-actions').outerHeight();

    if (MAX_MOBILE_WIDTH < windowWidth) {
      Ember.$('.order-edit__create-order').outerHeight(windowHeight -
        (customerHeight + orderDetails + orderActions));
    }
  },

  bindResize: Ember.on('init', function() {
    Ember.$(window).on('resize', Ember.run.bind(this, this.handleCreateResize));
  })

});
