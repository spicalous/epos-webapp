import DS from 'ember-data';
import Customer from './customer';

export default Customer.extend({
  name: DS.attr('string'),
  type: Ember.computed.alias('constructor.modelName')
});
