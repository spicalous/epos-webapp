import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({
      menu: this.store.findAll('menu-item'),
      categories: this.store.peekAll('category'),
      editOptions: this.store.peekAll('edit-option'),
      order: this.store.createRecord('order', {})
    });
  },
  actions: {
    showCustomerSelect: function() {
      this.render('customer-select', {
        into: 'orderpad',
        outlet: 'customer-select',
      });
    }
  }
});
