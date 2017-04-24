import Ember from 'ember';
const MAX_MOBILE_WIDTH = 767;

export default Ember.Route.extend({

  model() {
    return Ember.RSVP.hash({
      menu: this.store.findAll('menu-item'),
      categories: this.store.findAll('category'),
      editCategories: this.store.findAll('edit-category'),
      editOptions: this.store.findAll('edit-option')
    });
  },

  handleResize() {
    let windowHeight = Ember.$(window).height();
    let windowWidth = Ember.$(window).width();
    let topContainerHeight = Ember.$('.order-edit__top-container').outerHeight();
    let categoriesHeight = Ember.$('.order-edit__categories').outerHeight();
    let $menu = Ember.$('.order-edit__menu');
    let menuPadding = parseInt($menu.css('padding-top')) + parseInt($menu.css('padding-bottom'));

    $menu.height(windowHeight - (categoriesHeight + topContainerHeight) - (isNaN(menuPadding) ? 0 : menuPadding));

    if (MAX_MOBILE_WIDTH < windowWidth) {
      Ember.$('.order-edit__numpad').height(windowHeight - categoriesHeight);
    }
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
