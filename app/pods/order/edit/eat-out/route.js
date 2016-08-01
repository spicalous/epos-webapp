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

  handleResize() {
    let windowHeight = Ember.$(window).height();
    let windowWidth = Ember.$(window).width();
    let customerHeight = Ember.$('.order-edit__eat-out-customer').outerHeight();

    if (MAX_MOBILE_WIDTH < windowWidth) {
      Ember.$('.order-edit__eat-out-order').outerHeight(windowHeight - customerHeight);
    }
  },

  bindResize: Ember.on('init', function() {
    Ember.$(window).on('resize', Ember.run.bind(this, this.handleResize));
  })

});
