import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action, computed } from '@ember/object';
import { MODIFIER_TYPES } from 'epos-webapp/models/order-modifier';

const MODIFIER_TYPE_TO_DISPLAY = {
  PERCENT: '%',
  ABSOLUTE: '£'
};

const VALID_PERCENT_PATTERN = /^\d{1,3}$/;
const VALID_ABSOLUTE_PATTERN = /^\d+(?:\.\d?\d?)?$/;

const MODIFIER_TYPE_TO_VALIDATOR = {
  PERCENT: function(value) {
    return VALID_PERCENT_PATTERN.test(value) && 0 < new Number(value) && new Number(value) < 101;
  },
  ABSOLUTE: function(value) {
    return VALID_ABSOLUTE_PATTERN.test(value) && 0 < new Number(value);
  }
};

export default class ModalApplyOrderModifierComponent extends Component {

  types = MODIFIER_TYPE_TO_DISPLAY;

  @tracked selectedType = MODIFIER_TYPES.PERCENT;
  @tracked value = '';

  @computed('value', 'selectedType')
  get isValid() {
    let validator = MODIFIER_TYPE_TO_VALIDATOR[this.selectedType];
    return validator(this.value);
  }

  @computed('value', 'isValid')
  get validationCssClass() {
    if (this.value === '') {
      return '';
    }
    return this.isValid
      ? 'is-valid'
      : 'is-invalid';
  }

  @computed('isValid', 'selectedType', 'value')
  get invalidFeedback() {
    if (this.isValid || this.value === '') {
      return '';
    }
    return this.selectedType == MODIFIER_TYPES.PERCENT
      ? 'Must be a number between 0 and 100'
      : 'Must be a number with a maximum of 2 decimal places"';
  }

  @action
  selectType(type) {
    this.selectedType = type;
  }

  @action
  applyOrderModifier() {
    this.args.onApplyOrderModifier(this.selectedType, new Number(this.value));
  }
}
