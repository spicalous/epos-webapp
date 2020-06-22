import Component from '@glimmer/component';
import { action, computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class FormElementComponent extends Component {

  @tracked clickedOutside = false;

  @computed('args.suggestions', 'clickedOutside')
  get showSuggestions() {
    return this.args.suggestions
      && this.args.suggestions.length > 0
      && !this.clickedOutside;
  }

  @action
  onClickOutside() {
    this.clickedOutside = true;
  }

  @action
  onClickInside() {
    this.clickedOutside = false;
  }
}
