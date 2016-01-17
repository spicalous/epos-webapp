import Customer from './customer';
import DS from 'ember-data';
import Ember from 'ember';

export default Customer.extend({
  name: DS.attr('string'),

  invalidName: Ember.computed('invalidNameReason', function() {
    return !!this.get('invalidNameReason');
  }),

  invalidNameReason: Ember.computed('name', function() {
    let name = this.get('name');

    if (!name) {
      return "Name must not be empty.";
    }
    if (!name.trim()) {
      return "Name must not be empty.";
    }
    if (name.length > 20) {
      return "Name must not be more than 20 characters.";
    }
    return "";
  })

});
