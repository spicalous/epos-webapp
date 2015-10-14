import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'button',
  attributeBindings: ['type', 'data-toggle', 'data-target', 'data-dismiss'],
  type: 'button',
  classNameBindings: ['disabled'],
  classNames: ['btn'],

  click() {
    this.sendAction();
  }

});
