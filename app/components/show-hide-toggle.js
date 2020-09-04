import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class ShowHideToggleComponent extends Component {

  @tracked show;

  constructor() {
    super(...arguments);
    if (this.args.initial) {
      this.show = !!this.args.initial;
    }
  }

  @action
  toggleShow() {
    this.show = !this.show;
  }

}
