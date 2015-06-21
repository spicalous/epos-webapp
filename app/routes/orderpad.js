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
    categoryItemClick: function(categoryItem) {
      console.log(categoryItem.get('name'));
    },
    menuItemClick: function(menuItem) {
      this.modelFor('orderpad').order.addItem(menuItem);
    },
    submitOrder: function() {
      var route = this;

      this.modelFor('orderpad')
        .order
        .set('date', Date.now())
        .save()
        .then(function() {
          console.log('onFail');
        }, function() {
          //TODO Find a way to refresh just model.order otherwise a REST call is made for a non-changing menu
          route.refresh();
        });
    }
  }
});
