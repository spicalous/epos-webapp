import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'button',
  attributeBindings: ['type'],
  type: 'button',
  classNames: ['btn', 'btn-success', 'pull-right', 'submit-btn'],
  click: function() {
    this.sendAction();
  }
});