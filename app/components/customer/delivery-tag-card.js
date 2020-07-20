import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action, computed } from '@ember/object';

export default class CustomerDeliveryTagCardComponent extends Component {

  @tracked editing = false;

  @computed('args.tag.{name,colour}')
  get canSave() {
    return this.args.tag.get('hasDirtyAttributes') && this.args.tag.name && this.args.tag.name.length < 101;
  }

  @action
  startEditing() {
    this.editing = true;
  }

  @action
  cancelEditing() {
    this.args.tag.rollbackAttributes();
    this.editing = false;
  }

  @action
  setTagColour(colour) {
    this.args.tag.colour = colour;
  }

  @action
  save() {
    this.args.tag.name = this.args.tag.name.trim();
    this.args.onSave(this.args.tag, () => this.editing = false);
  }

  willDestroy() {
    this.args.tag.rollbackAttributes();
    super.willDestroy(...arguments);
  }
}
