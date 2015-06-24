import Ember from "ember";

export default Ember.Component.extend({
  tagName: 'a',
  classNames: ['btn-danger', 'decrement-btn'],
  click: function() {
    this.sendAction('action', this.get('orderItemParam'));
  }
});
