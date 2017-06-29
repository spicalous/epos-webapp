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

//TODO Make edit option checkboxes tappable full height
//TODO active state on category and edit category
