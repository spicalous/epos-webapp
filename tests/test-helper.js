import Application from 'epos-webapp/app';
import config from 'epos-webapp/config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

start();
