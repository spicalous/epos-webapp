import Ember from "ember";

export default Ember.Component.extend({
  tagName: 'button',
  attributeBindings: ['type'],
  type: 'button',
  classNames: ['btn btn-default'],
  click: function() {
    this.sendAction();
  }
});
