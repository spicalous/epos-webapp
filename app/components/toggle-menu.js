import Ember from "ember";

export default Ember.Component.extend({
  tagName: 'button',
  attributeBindings: ['type', 'dataToggle:data-toggle', 'dataTarget:data-target'],
  dataToggle: 'modal',
  dataTarget: '#orderpad-modal',
  type: 'button',
  classNames: ['btn', 'btn-default', 'toggle-menu'],
  click: function() {
    this.sendAction();
  }
});
