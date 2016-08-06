import Ember from 'ember';

export default Ember.Controller.extend({

  orderService: Ember.inject.service('order'),

  orderModalId: 'order-edit-eat-out__order-modal',

  actions: {

    editItem(orderItem) {
      this.set('itemToEdit', orderItem);
    },

    decrementItem(orderItem) {
      this.get('orderService').decrement(orderItem);
    },

    cancelEdit() {
      this.get('model').rollbackAttributes();
      this.get('orderService').invokeRollback();
      this.get('orderService').clear();
      this.transitionToRoute('order.view');
    },

    showConfirmEdit() {
      console.log('confirm');
    },

  }
});
