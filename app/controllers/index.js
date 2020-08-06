import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import ENV from 'epos-webapp/config/environment';

export default class IndexController extends Controller {

  @service ui;

  name = ENV.APP.name;
  version = ENV.APP.version;

  @tracked showNewOrderModal = false;

  @action
  toggleCreateModal() {
    this.showNewOrderModal = !this.showNewOrderModal;
  }

  @action
  onCreateOrder() {
    this.showNewOrderModal = false;
  }

  @action
  transitionToOrder(order) {
    this.transitionToRoute('order.eat-in', order.id);
  }

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
