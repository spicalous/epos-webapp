import EmberRouter from '@ember/routing/router';
import config from 'epos-webapp/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('order', function() {
    this.route('new');
    this.route('eat-out', { path: '/eat-out/:eat_out_id' });
    this.route('eat-in', { path: '/eat-in/:eat_in_id' });
  });
  this.route('orders', function() {
    this.route('eat-in');
    this.route('eat-out');
  });
  this.route('delivery-customer-tags');
  this.route('delivery-customers');
  this.route('menu');
});
