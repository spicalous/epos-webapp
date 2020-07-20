import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action, computed } from '@ember/object';
import { validate } from './../models/delivery-customer-tag';

const DEFAULT_COLOUR = 'blue';

export default class DeliveryCustomerTagsController extends Controller {

  @service ui;
  @service store;

  @tracked newTagName = '';
  @tracked newTagColour = DEFAULT_COLOUR;

  @computed('newTagName')
  get canCreate() {
    return !validate(this.newTagName);
  }

  @action
  setNewTagColour(colour) {
    this.newTagColour = colour;
  }

  @action
  createDeliveryCustomerTag() {
    let record = this.store.createRecord('delivery-customer-tag', {
      name: this.newTagName.trim(),
      colour: this.newTagColour
    });

    record.save()
      .then(() => {
        this.ui.showToast('Created delivery customer tag', 3900);
        this.newTagName = '';
        this.newTagColour = DEFAULT_COLOUR;
      })
      .catch(error => {
        console.error('Failed to create delivery-customer-tag', error);
        this.ui.showAppOverlay(
          'Failed to create delivery customer tag :(',
          error && error.errors && error.errors[0] && error.errors[0].detail || error.message || 'Unknown error');
        record.unloadRecord();
      });
  }

  @action
  saveDeliveryCustomerTag(tag, onSuccessCallback) {
    tag.save()
      .then(() => {
        this.ui.showToast('Saved delivery customer tag', 3900);
        onSuccessCallback();
      })
      .catch(error => {
        console.error('Failed to save delivery-customer-tag', error);
        this.ui.showAppOverlay(
          'Failed to save delivery customer tag :(',
          error && error.errors && error.errors[0] && error.errors[0].detail || error.message || 'Unknown error');
      });
  }

  @action
  deleteDeliveryCustomerTag(tag) {
    tag.destroyRecord()
      .then(() => this.ui.showToast('Deleted delivery customer tag', 3900))
      .catch(error => {
        console.error('Failed to delete delivery-customer-tag', error);
        this.ui.showAppOverlay(
          'Failed to delete delivery customer tag :(',
          error && error.errors && error.errors[0] && error.errors[0].detail || error.message || 'Unknown error');
      });
  }
}
