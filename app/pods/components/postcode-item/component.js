import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'a',

  classNames: ['list-group-item'],

  click() {
    this.sendAction('action', this.get('postcode'));
  }

});
