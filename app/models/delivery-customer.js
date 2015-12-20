import DS from 'ember-data';
import Customer from './customer';

export default Customer.extend({
  address: DS.attr('string'),
  postcode: DS.attr('string')
});
