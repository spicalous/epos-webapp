import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'button',

  type: 'button',

  attributeBindings: ['type', 'data-toggle', 'data-target', 'data-dismiss'],

  classNames: ['btn'],

  classNameBindings: ['disabled'],

  click() {
    if (!this.get('disabled')) {
      this.sendAction();
    }
  }

});
