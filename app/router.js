import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('orderpad');
  this.route('delivery-customer', function() {
    this.route('edit', { path: '/:delivery_customer_id' });
  });
  this.route('road', function() {
    this.route('edit', { path: '/:road_id' });
  });
  this.route('postcode', function() {
    this.route('edit', { path: '/:postcode_id' });
  });

  this.route('orders');
  this.route('restaurant');
});

export default Router;
