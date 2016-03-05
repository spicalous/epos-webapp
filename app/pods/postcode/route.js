import Ember from 'ember';

export default Ember.Route.extend({

  handleResize() {
    let windowHeight = Ember.$(window).height();
    let windowWidth = Ember.$(window).width();
    let size = windowHeight - (Ember.$('#postcode-search').outerHeight() + 50);

    Ember.$('#postcode-search-list').height(
      windowWidth < 768 ?
        size - Ember.$('#postcode-edit').outerHeight() :
        size);
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
