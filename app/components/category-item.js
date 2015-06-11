import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  click: function() {
    this.sendAction('action', this.get('category'));
  }
});
