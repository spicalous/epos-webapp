import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate: function() {
    this.render('orderpad');
    this.render('menu', {
      into: 'orderpad',
      outlet: 'menu',
      controller: 'menu',
      model: this.store.findAll('menu-item')
    });
  },
  model: function() {
    return Ember.RSVP.hash({
      menu: this.store.all('menu-item'),
      categories: this.store.all('category'),
      order: this.store.createRecord('order', {})
    });
  },
  actions: {
    menuItemClick: function(menuItem) {
      this.modelFor('orderpad').order.addItem(menuItem);
    },
    refresh: function() {
      this.refresh();
    }
  }
});
