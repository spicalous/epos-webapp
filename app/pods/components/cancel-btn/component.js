import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'button',
  attributeBindings: ['type'],
  type: 'button',
  classNameBindings: ['disabled'],
  classNames: ['btn', 'btn-danger', 'cancel-btn'],

  click() {
    this.sendAction();
  }

});
