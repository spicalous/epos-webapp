import Ember from 'ember';
import ButtonDefault from '../btn-default/component';

export default ButtonDefault.extend({

  classNameBindings: ['is-selected'],

  selectedObserver: Ember.observer('selected', function() {
    this.set('is-selected', this.get('selected') === this.get('model'));
  }),

  click() {
    this.sendAction('action', this.get('model'));
  }

});
