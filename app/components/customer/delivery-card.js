import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action, computed } from '@ember/object';
import { validate } from './../../models/customer/delivery';
import { inject as service } from '@ember/service';
import { arrayEquals } from './../../util/array';

export default class CustomerDeliveryCardComponent extends Component {

  @service store;
  @service ui;

  @tracked editing = false;
  @tracked tags = null;
  @tracked invalidReason = '';
  @tracked originalTags = null;

  @computed('originalTags', 'invalidReason', 'args.customer.{hasDirtyAttributes,deliveryCustomerTags.[]}')
  get canSave() {
    let tagsChanged = false;
    if (this.originalTags) {
      let originalTagIds = this.originalTags.mapBy('id');
      let currentTagIds = this.args.customer.get('deliveryCustomerTags').mapBy('id');
      tagsChanged = !arrayEquals(originalTagIds, currentTagIds);
    }
    return !this.invalidReason && (this.args.customer.get('hasDirtyAttributes') || tagsChanged);
  }

  @action
  startEditing() {
    this.tags = this.store.findAll('delivery-customer-tag');
    this.originalTags = this.args.customer.get('deliveryCustomerTags').slice();
    this.editing = true;
  }

  @action
  cancelEditing() {
    this.tags = null;
    this.args.customer.set('deliveryCustomerTags', this.originalTags);
    this.originalTags = null;
    this.args.customer.rollbackAttributes();
    this.invalidReason = '';
    this.editing = false;
  }

  @action
  onChange(telephone, addressOne, road, postcode) {
    telephone = telephone ? telephone.trim() : '';
    addressOne = addressOne ? addressOne.trim() : '';
    road = road ? road.trim() : '';
    postcode = postcode ? postcode.trim() : '';
    this.invalidReason = validate(telephone, addressOne, road, postcode);
    this.args.customer.set('telephone', telephone);
    this.args.customer.set('addressOne', addressOne);
    this.args.customer.set('road', road);
    this.args.customer.set('postcode', postcode);
  }

  @action
  onEdit() {
    this.args.onEdit(this.args.customer, () => {
      this.editing = false;
    });
  }

  @action
  addTag(tag) {
    this.args.customer.get('deliveryCustomerTags').addObject(tag);
  }

  @action
  deleteTag(tag) {
    this.args.customer.get('deliveryCustomerTags').removeObject(tag);
  }

  willDestroy() {
    if (this.editing) {
      if (this.originalTags) {
        this.args.customer.set('deliveryCustomerTags', this.originalTags);
      }
      this.args.customer.rollbackAttributes();
    }
    super.willDestroy(...arguments);
  }

}
