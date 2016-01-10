import DS from 'ember-data';
import Customer from 'talaythai-webapp/models/customer';

export default Customer.extend({
  address: DS.attr('string'),
  postcode: DS.attr('string')
});
