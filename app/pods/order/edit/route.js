import Ember from 'ember';

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
