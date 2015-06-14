import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['col-xs-3', 'col-md-3'],
  click: function() {
    this.sendAction('action', this.get('category'));
  }
});
