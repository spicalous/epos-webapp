import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'a',
  classNames: ['btn-danger', 'decrement-btn'],

  click() {
    this.sendAction('action', this.get('orderItem'));
  }

});
