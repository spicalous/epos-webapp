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
      categories: this.store.all('category'),
      order: this.store.createRecord('order', {})
    });
  },
  actions: {
    menuItemClick: function(menuItem) {
      this.modelFor('orderPad').order.addItem(menuItem);
    },
    categoryItemClick: function(categoryItem) {
      console.log(categoryItem.get('name'));
    }
  }
});
