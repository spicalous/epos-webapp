import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ButtonWithConfirmComponent extends Component {

  @service ui;

  @action
  confirm() {
    this.ui.showConfirm(this.args.confirmTitle, this.args.confirmMessage, () => this.args.onConfirm());
  }
}
