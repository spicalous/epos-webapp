import Ember from "ember";

export default Ember.Component.extend({
  tagName: 'div',
  attributeBindings: ['type'],
  type: 'button',
  classNames: ['btn', 'main-btn'],
  click: function() {
    this.sendAction();
  }
});
