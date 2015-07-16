import Ember from "ember";
import config from "./config/environment";

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {

  this.resource('orderpad', function() {
    this.route('restaurant');
    this.route('delivery');
    this.route('takeaway');
  });

  this.route('menuItem');

});

export default Router;
