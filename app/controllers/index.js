import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class IndexController extends Controller {

  @service
  ui;

  @action
  saveSetting(setting, newValue) {
    setting.set('value', newValue);
    setting.save().catch(error => {
      console.error('Failed to save setting', error);
      setting.rollbackAttributes();
      this.ui.showAppOverlay('Failed to save setting :(');
    });
  }

}
