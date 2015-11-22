import DS from 'ember-data';
import Customer from './customer';

export default Customer.extend({
  mainAddress: DS.attr('string'),
  postcode: DS.attr('string'),
  contactNumber: DS.attr('string')
});
