import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNameBindings: ['isActive:active'],

  isActive: function() {
    return this.get('current') === this.get('text');
  }.property('current', 'text'),

  click() {
    this.sendAction('action', this.get('text'));
  }

});
