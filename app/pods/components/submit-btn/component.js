import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'button',
  attributeBindings: ['type'],
  type: 'button',
  classNameBindings: ['disabled'],
  classNames: ['btn', 'btn-success', 'submit-btn'],

  click() {
    this.sendAction();
  }

});
