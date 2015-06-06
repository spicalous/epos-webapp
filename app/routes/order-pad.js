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
  }
});
