import Ember from 'ember';

export default Ember.Controller.extend({

  search: '',

  emptySearch: Ember.computed('search', function() {
    return !this.get('search');
  }),

  handleResize() {
    let windowHeight = Ember.$(window).height();
    let windowWidth = Ember.$(window).width();

    if (windowWidth < 768) {
      Ember.$('#road-search-list').height(windowHeight - (
        Ember.$('#road-search').outerHeight() +
        50 +
        146));
        //#road-edit expanded = 146;
    }
  },

  bindResize: Ember.on('init', function() {
    Ember.$(window).on('resize', Ember.run.bind(this, this.handleResize));
    this.handleResize();
  }),

  actions: {

    searchRoads() {
      let road = this.get('search');
      let _this = this;

      this.send('showMessage', 'loader', { message: 'Searching roads..' });
      this.store.query('road', {
        road: road
      }).then(function(roads) {
        _this.send('dismissMessage', 'loader');
        _this.set('searchResults', roads);
      }).catch(function(response) {
        _this.send('dismissMessage', 'loader');
        _this.send('showMessage', 'overlay', {
          header: 'Error searching for roads :(',
          body: response.errors[0].message
        });
      });
    },

    transitionToRoad(road) {
      this.transitionToRoute('road.edit', road);
    }
  }

});
