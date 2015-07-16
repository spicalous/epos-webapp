import Ember from "ember";

export default Ember.Component.extend({
  tagName: 'a',
  classNames: ['list-group-item', 'no-select'],
  click: function() {
    this.sendAction('action', this.get('menuItem'));
  }
});
