import Ember from 'ember';

export default Ember.Route.extend({

  handleResize() {
    let windowHeight = Ember.$(window).height();
    let windowWidth = Ember.$(window).width();

    if (windowWidth < 768) {
      Ember.$('#road-search-list').height(windowHeight - (
        Ember.$('#road-search').outerHeight() +
        50 +
        Ember.$('#road-edit').outerHeight())); //#road-edit expanded = 146;
    } else {
      Ember.$('#road-search-list').height(windowHeight - (
        Ember.$('#road-search').outerHeight() +
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
