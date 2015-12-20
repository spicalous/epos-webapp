import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  contactNumber: DS.attr('string'),
  customerType: Ember.computed.alias('constructor.modelName')
});
