import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'button',
  attributeBindings: ['type', 'data-toggle', 'data-target'],
  type: 'button',
  classNames: ['btn', 'btn-default']
});

//TODO use {{if hasBlock}} and display dummy when hasBlock=false
