import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: [],

  actions: {

    incrementItem(orderItem) {
      orderItem.incrementProperty('quantity');
    },

    decrementItem(orderItem) {
      this.get('onDecrementItem')(orderItem);
    },

    onEditItem(orderItem) {
      this.get('onEditItem')(orderItem);
    }

  }
});
