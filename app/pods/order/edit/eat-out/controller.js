import Ember from 'ember';

export default Ember.Controller.extend({

  orderService: Ember.inject.service('order'),

  actions: {

    editItem(orderItem) {
      this.set('itemToEdit', orderItem);
    },

    cancelEdit() {
      this.get('orderService').clear();
      this.transitionToRoute('order.view');
    },

    showConfirmEdit() {
      console.log('confirm');
    },

  }
});
