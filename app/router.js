import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('orderpad');
  this.route('customers');
  this.route('deliveryCustomer', { path: '/deliveryCustomer/:customer_id' });

  this.route('orders');
  this.route('restaurant');
});

export default Router;
