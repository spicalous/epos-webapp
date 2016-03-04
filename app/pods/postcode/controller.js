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
      Ember.$('#postcode-search-list').height(windowHeight - (
        Ember.$('#postcode-search').outerHeight() +
        50 +
        146));
        //#postcode-edit expanded = 146;
    }
  },

  bindResize: Ember.on('init', function() {
    Ember.$(window).on('resize', Ember.run.bind(this, this.handleResize));
    this.handleResize();
  }),

  actions: {

    searchPostcodes() {
      let postcode = this.get('search');
      let _this = this;

      this.send('showMessage', 'loader', { message: 'Searching postcodes..' });
      this.store.query('postcode', {
        postcode: postcode
      }).then(function(postcodes) {
        _this.send('dismissMessage', 'loader');
        _this.set('searchResults', postcodes);
      }).catch(function(response) {
        _this.send('dismissMessage', 'loader');
        _this.send('showMessage', 'overlay', {
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
