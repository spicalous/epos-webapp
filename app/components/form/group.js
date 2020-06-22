import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class FormGroupComponent extends Component {

  @tracked
  isDirty = false;

  get shouldApplyWasValidatedCss() {
    return this.isDirty
      && this.args.validateOnDirty
      && (this.isNotEmpty || this.isRequired);
  }

  @action
  onElementChanged(event) {
    this.isDirty = true;
    this.isNotEmpty = !!event.target.value;
    this.isRequired = event.target.required;
  }

  @action
  onElementInput(event) {
    this.isDirty = true;
    this.isNotEmpty = !!event.target.value;
    this.isRequired = event.target.required;
  }
}
