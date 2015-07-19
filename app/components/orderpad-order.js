import Ember from "ember";

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['orderpad-order', 'no-select'],
  actions: {
    decrementItem: function(orderItem) {
      var quantity = orderItem.get('quantity');

      if (quantity === 1) {
         orderItem.destroyRecord();
      } else {
         orderItem.set('quantity', --quantity);
      }
    }
  }
});
