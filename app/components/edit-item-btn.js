import Ember from "ember";

export default Ember.Component.extend({
  tagName: 'a',
  attributeBindings: ['data-toggle', 'aria-haspopup', 'aria-expanded'],
  classNames: ['edit-item-btn', 'dropdown-toggle'],
  click: function() {
    this.sendAction('action');
  }
});
