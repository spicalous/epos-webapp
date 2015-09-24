import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNameBindings: ['isActive:active'],

  isActive: function() {
    return this.get('current') === this.get('item');
  }.property('current', 'item'),

  click() {
    this.sendAction('action', this.get('item'));
  }

});
