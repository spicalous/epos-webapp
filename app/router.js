import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('orderpad');
  this.route('orders');
  this.route('restaurant');
  this.resource('customers');
  this.resource('deliveryCustomer', { path: '/deliveryCustomer/:customer_id' }, function() {
    this.route('edit');
  });
});

export default Router;
