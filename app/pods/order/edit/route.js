import Ember from 'ember';
const MAX_MOBILE_WIDTH = 767;

export default Ember.Route.extend({

  model() {
    return Ember.RSVP.hash({
      menu: this.store.findAll('menu-item'),
      categories: this.store.peekAll('category'),
      editCategories: this.store.peekAll('edit-category'),
      editOptions: this.store.peekAll('edit-option')
    });
  },

  handleResize() {
    let windowHeight = Ember.$(window).height();
    let windowWidth = Ember.$(window).width();
    let topContainerHeight = Ember.$('.order-edit__top-container').outerHeight();
    let categoriesHeight = Ember.$('.order-edit__categories').outerHeight();

    if (MAX_MOBILE_WIDTH < windowWidth) {
      Ember.$('.order-edit__numpad').height(windowHeight - categoriesHeight);
    }
    Ember.$('.order-edit__menu').height(windowHeight - (categoriesHeight + topContainerHeight));
  },

  bindResize: Ember.on('init', function() {
    Ember.$(window).on('resize', Ember.run.bind(this, this.handleResize));
  }),

  actions: {

    didTransition() {
      Ember.run.scheduleOnce('afterRender', this, () => this.handleResize());
    }

  }

});
