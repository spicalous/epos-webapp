import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class NumberPadComponent extends Component {

  maxLength = 4;

  @action
  onBackspace() {
    this.args.onChange(this.args.value.substring(0, this.args.value.length - 1));
  }

  @action
  onClick(value) {
    if (this.args.value.length < this.maxLength) {
      this.args.onChange(this.args.value + value);
    }
  }

  @action
  onClear() {
    this.args.onChange('');
  }

}
