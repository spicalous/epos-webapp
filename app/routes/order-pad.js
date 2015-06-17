import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate: function() {
    this.render('order-pad');
    this.render('menu', {
      into: 'order-pad',
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
      this.modelFor('orderPad').order.addItem(menuItem);
    },
    orderItemClick: function(orderItem) {
      orderItem.incrementProperty('quantity');
    },
    submitOrder: function() {
      var order = this.modelFor('orderPad').order;
      order.set('date', Date.now());

      order.save().then(function(post) {
        console.log('onFail');
      },
      function(post) {
        console.log('onSuccess');
      });
    }
  }
});
