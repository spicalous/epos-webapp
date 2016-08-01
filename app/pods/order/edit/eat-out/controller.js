import Ember from 'ember';

export default Ember.Controller.extend({

  orderService: Ember.inject.service('order'),

  actions: {

    editItem(orderItem) {
      this.set('itemToEdit', orderItem);
    }

  }
});
