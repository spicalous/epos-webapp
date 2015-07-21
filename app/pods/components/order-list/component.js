import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['orderpad-order', 'no-select'],
  actions: {
    decrementItem: function(orderItem) {
      if (orderItem.get('quantity') === 1) {
         orderItem.destroyRecord();
      } else {
         orderItem.decrementProperty('quantity');
      }
    },
    editItem: function(orderItem, order) {
      order.set('itemToEdit', orderItem);
    }
  }
});
