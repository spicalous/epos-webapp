import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'li',

  classNames: ['order-item', 'list-group-item'],

  expanded: false,

  editing: false,

  click(event) {
    // only toggle expanded if click events we're not from a modal when editing an item
    if (this.$(event.target).closest('.modal').length === 0) {
      this.toggleProperty('expanded');
    }
  },

  actions: {

    increment() {
      this.get('item').incrementProperty('quantity');
    },

    decrement() {
      this.get('onDecrement')(this.get('item'));
    },

    toggleEdit() {
      this.toggleProperty('editing');
    }

  }
});
