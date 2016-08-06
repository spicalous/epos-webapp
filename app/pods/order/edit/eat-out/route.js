import Ember from 'ember';
const MAX_MOBILE_WIDTH = 767;

export default Ember.Route.extend({

  model(params) {
    return this.store.findRecord('order/eat-out', params.eat_out_id);
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('menu', this.modelFor('order/edit'));
    controller.get('orderService').setItems(model.get('orderItems'));
  },

  renderTemplate(controller, model) {
    this._super(controller, model);
    this.render('modal-toggle-btn', {
      outlet: 'float-bottom-container'
    });
  },

  handleResize() {
    let windowHeight = Ember.$(window).height();
    let windowWidth = Ember.$(window).width();
    let confirmHeader = Ember.$('.order-edit-eat-out__confirm-edit-header').outerHeight();
    let confirmFooter = Ember.$('.order-edit-eat-out__confirm-edit-footer').outerHeight();

    if (MAX_MOBILE_WIDTH < windowWidth) {
      let customerHeight = Ember.$('.order-edit-eat-out__customer').outerHeight();
      let orderDetails = Ember.$('.order-edit-eat-out__details').outerHeight();
      let orderActions = Ember.$('.order-edit-eat-out__actions').outerHeight();
      Ember.$('.order-edit-eat-out__order').outerHeight(windowHeight -
        (customerHeight + orderDetails + orderActions));
    }
    Ember.$('.order-edit-eat-out__confirm-edit-body').outerHeight(windowHeight -
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
