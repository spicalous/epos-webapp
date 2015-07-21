import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  attributeBindings: ['id'],
  id: 'orderpad-modal',
  classNames: ['modal', 'fade'],
});
