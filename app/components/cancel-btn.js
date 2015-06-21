import Ember from "ember";

export default Ember.Component.extend({
  tagName: 'button',
  attributeBindings: ['type'],
  type: 'button',
  classNames: ['btn', 'btn-danger', 'pull-right', 'cancel-btn'],
  click: function() {
    this.sendAction();
  }
});
