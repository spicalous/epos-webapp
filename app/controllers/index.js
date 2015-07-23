import Ember from 'ember';
import config from '../config/environment';

export default Ember.Controller.extend({
  name: config.APP.name,
  version: config.APP.version
});
