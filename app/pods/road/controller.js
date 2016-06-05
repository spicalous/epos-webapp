import Ember from 'ember';

export default Ember.Controller.extend({

  search: '',

  emptySearch: Ember.computed('search', function() {
    return !this.get('search');
  }),

  actions: {

    searchRoads() {
      let road = this.get('search') ? this.get('search').trim() : '';

      this.send('showMessage', 'loader', { message: 'Searching roads..' });
      this.store.query('road', {
        road: road,
        limit: 50
      }).then((roads) => {
        this.send('dismissMessage', 'loader');
        this.set('searchResults', roads);
      }).catch((response) => {
        this.send('dismissMessage', 'loader');
        this.send('showMessage', 'overlay', {
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
