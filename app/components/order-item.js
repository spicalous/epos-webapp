import Ember from "ember";

export default Ember.Component.extend({
  tagName: 'li',
  classNames: ['list-group-item'],
  click: function() {
    this.sendAction('action', this.get('orderItem'));
  }
});
