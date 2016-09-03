import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'li',

  classNames: ['order-item-list-item', 'list-group-item'],

  expanded: false,

  actions: {

    toggleExpanded() {
      this.set('expanded', !this.get('expanded'));
    },

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
