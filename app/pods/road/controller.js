import Ember from 'ember';

export default Ember.Controller.extend({

  search: '',

  emptySearch: Ember.computed('search', function() {
    return !this.get('search');
  }),

  actions: {

    searchRoads() {
      let road = this.get('search') ? this.get('search').trim() : '';
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
