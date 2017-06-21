import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'button',

  type: 'button',

  attributeBindings: ['type'],

  classNames: ['btn', 'btn-secondary', 'btn-block'],

  classNameBindings: ['is-selected'],

  selectedObserver: Ember.observer('selected', function() {
    this.set('is-selected', this.get('selected') === this.get('category'));
  })

});
