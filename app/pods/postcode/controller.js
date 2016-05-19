import Ember from 'ember';

export default Ember.Controller.extend({

  search: '',

  emptySearch: Ember.computed('search', function() {
    return !this.get('search');
  }),

  actions: {

    searchPostcodes() {
      let postcode = this.get('search') ? this.get('search').trim() : '';

      this.send('showMessage', 'loader', { message: 'Searching postcodes..' });
      this.store.query('postcode', {
        postcode: postcode
      }).then((postcodes) => {
        this.send('dismissMessage', 'loader');
        this.set('searchResults', postcodes);
      }).catch((response) => {
        this.send('dismissMessage', 'loader');
        this.send('showMessage', 'overlay', {
          header: 'Error searching for postcodes :(',
          body: response.errors[0].message
        });
      });
    },

    transitionToPostcode(postcode) {
      this.transitionToRoute('postcode.edit', postcode);
    }
  }

});
