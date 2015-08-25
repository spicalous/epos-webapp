import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'button',
  attributeBindings: ['type'],
  type: 'button',
  classNameBindings: ['disabled'],
  classNames: ['btn', 'btn-success', 'pull-right', 'submit-btn'],

  click() {
    this.sendAction();
  }

});
