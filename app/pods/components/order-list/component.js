import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: [],

  actions: {

    incrementItem(orderItem) {
      orderItem.incrementProperty('quantity');
    },

    decrementItem(orderItem) {
      if (orderItem.get('quantity') === 1) {
         orderItem.destroyRecord();
      } else {
         orderItem.decrementProperty('quantity');
      }
    },

    editItem(orderItem, order) {
      order.set('itemToEdit', orderItem);
    }

  }
});
