import Ember from "ember";

export default Ember.Component.extend({
  tagName: 'li',
  classNames: ['list-group-item', 'clearfix'],
  click: function() {
    this.sendAction('action', this.get('orderItem'));
  },
  actions: {
    decrementItem: function() {
      var orderItem = this.get('orderItem');
      var quantity = orderItem.get('quantity');

      if (quantity === 1) {
         orderItem.destroyRecord();
      } else {
         orderItem.set('quantity', --quantity);
      }
    },
    editItem: function() {
      var orderItem = this.get('orderItem');
      console.log(orderItem);
    }
  }
});
