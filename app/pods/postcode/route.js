import Ember from 'ember';

export default Ember.Route.extend({

  handleResize() {
    let windowHeight = Ember.$(window).height();
    let windowWidth = Ember.$(window).width();

    if (windowWidth < 768) {
      Ember.$('#postcode-search-list').height(windowHeight - (
        Ember.$('#postcode-search').outerHeight() +
        50 +
        Ember.$('#postcode-edit').outerHeight()));
    } else {
      Ember.$('#postcode-search-list').height(windowHeight - (
        Ember.$('#postcode-search').outerHeight() +
        50));
    }
  },

  bindResize: Ember.on('init', function() {
    Ember.$(window).on('resize', Ember.run.bind(this, this.handleResize));
  }),

  actions: {

    didTransition() {
      Ember.run.scheduleOnce('afterRender', this, function() {
        this.handleResize();
      });
    }

  }

});
