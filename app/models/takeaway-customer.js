import Customer from './customer';
import DS from 'ember-data';

export default Customer.extend({
  name: DS.attr('string')
});
