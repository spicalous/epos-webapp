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
  }

});
