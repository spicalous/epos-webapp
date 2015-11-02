import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'button',
  attributeBindings: ['type'],
  type: 'button',
  classNames: ['col-xs-3', 'btn', 'btn-default', 'category-item'],
  classNameBindings: ['is-selected'],

  selectedObserver: Ember.observer('selected', function() {
    this.set('is-selected', this.get('selected') === this.get('category'));
  }),

  click() {
    this.sendAction('action', this.get('category'));
  }

});
