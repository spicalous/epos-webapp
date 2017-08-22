import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

let App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

Ember.TextField.reopen({
  attributeBindings: ['data-toggle', 'aria-haspopup', 'aria-expanded']
});

export default App;

// TODO active state on edit item model edit category
// TODO linewrapping on menu and order items
// TODO tooltip for disabled cancel button
