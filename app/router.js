import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('orders');
  this.route('order', function() {
    this.route('new');
    this.route('eat-out', { path: '/eat-out/:eat_out_id' });
  });
  this.route('delivery-customer');
});
