import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate: function() {
    this.render('orderpad');
    this.render('menuItem', {
      into: 'orderpad',
      outlet: 'menu',
      controller: 'orderpad'
    });
  },
  model: function() {
    return Ember.RSVP.hash({
      menu: this.store.findAll('menu-item'),
      categories: this.store.all('category'),
      editOptions: this.store.all('edit-option'),
      order: this.store.createRecord('order', {})
    });
  },
  actions: {
    refresh: function() {
      this.refresh();
    }
  }
});
