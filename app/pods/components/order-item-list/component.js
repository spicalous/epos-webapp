import Ember from 'ember';

export default Ember.Component.extend({

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
