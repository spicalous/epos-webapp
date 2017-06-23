import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {

  this.route('order', function() {
    this.route('view');
    this.route('edit', function() {
      this.route('create');
      this.route('eat-out', { path: '/:eat_out_id' });
    });
  });

  this.route('delivery-customer', function() {
    this.route('edit', { path: '/:delivery_customer_id' });
  });

  this.route('road', function() {
    this.route('edit', { path: '/:road_id' });
  });

  this.route('postcode', function() {
    this.route('edit', { path: '/:postcode_id' });
  });

  this.route('restaurant');

});

export default Router;
