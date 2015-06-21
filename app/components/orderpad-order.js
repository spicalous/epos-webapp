import Ember from "ember";

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['orderPad-order'],
  actions: {
    orderItemClick: function(orderItem) {
      orderItem.incrementProperty('quantity');
    }
  }
});
