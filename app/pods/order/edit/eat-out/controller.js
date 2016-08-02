import Ember from 'ember';

export default Ember.Controller.extend({

  orderService: Ember.inject.service('order'),

  orderModalId: 'order-edit__eat-out-order-modal',

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
