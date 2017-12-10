import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {

  this.route('order', function() {
    this.route('view');
    this.route('edit', function() {
      this.route('eat-out', { path: '/:eat-out_id' });
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
