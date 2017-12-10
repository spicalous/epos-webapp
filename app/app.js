import Application from '@ember/application';
import TextField from '@ember/component'
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

const App = Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

TextField.reopen({
  attributeBindings: ['data-toggle', 'aria-haspopup', 'aria-expanded']
});

export default App;

// TODO active state on edit item model edit category
// TODO linewrapping on menu and order items
// TODO tooltip for disabled cancel button
