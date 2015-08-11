import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({
      menu: this.store.findAll('menu-item'),
      categories: this.store.all('category'),
      editOptions: this.store.all('edit-option'),
      order: this.store.createRecord('order', {})
    });
  }
});
