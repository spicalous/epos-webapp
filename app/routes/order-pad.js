import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate: function() {
    this.render('order-pad');
    this.render('menu', {
      into: 'order-pad',
      outlet: 'menu',
      controller: this.controllerFor('menu'),
      model: this.store.findAll('menu-item')
    });
  },
  model: function() {
    return Ember.RSVP.hash({
      menu: this.store.all('menu-item'),
      categories: this.store.all('category')
    });
  },
  actions: {
    menuItemClick: function(menuItem) {
      console.log(menuItem.get('name'));
    },
    categoryItemClick: function(categoryItem) {
      console.log(categoryItem.get('name'));
    }
  }
});
