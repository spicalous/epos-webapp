import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import ENV from 'epos-webapp/config/environment';

export default class IndexController extends Controller {

  @service
  ui;

  name = ENV.APP.name;
  version = ENV.APP.version;

  @action
  saveSetting(setting, newValue) {
    setting.set('value', newValue);
    setting.save().catch(error => {
      console.error('Failed to save setting', error);
      this.ui.showAppOverlay('Failed to save setting :(');
      setting.rollbackAttributes();
    });
  }

}
