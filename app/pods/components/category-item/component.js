import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'button',
  attributeBindings: ['type'],
  type: 'button',
  classNames: ['col-xs-3', 'btn', 'btn-default', 'category-item'],
  click: function() {
    this.sendAction('action', this.get('category'));
  }
});
