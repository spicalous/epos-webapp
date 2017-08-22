import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'button',

  type: 'button',

  attributeBindings: ['type'],

  classNames: ['btn', 'btn-block'],

  classNameBindings: ['is-selected:btn-main:btn-secondary'],

  selectedObserver: Ember.observer('selected', function() {
    this.set('is-selected', this.get('selected') === this.get('category'));
  })

});
