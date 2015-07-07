import Ember from "ember";

export default Ember.Component.extend({
  tagName: 'a',
  attributeBindings: ['dataToggle:data-toggle', 'ariaHaspopup:aria-haspopup'],
  dataToggle: 'dropdown',
  ariaHaspopup: true,
  classNames: ['edit-item-btn', 'dropdown-toggle']
});
