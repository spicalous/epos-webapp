import { observer } from '@ember/object';
import Component from '@ember/component';

const DROPDOWN_TRIGGER = '.suggestionDropdownTrigger';

export default Component.extend({

  classNames: ['dropdown'],

  didInsertElement() {
    this.$(DROPDOWN_TRIGGER).on('click tap', (event) => event.stopImmediatePropagation());
  },

  willDestroyElement() {
    this.$(DROPDOWN_TRIGGER).off();
  },

  /**
   * Selecting a suggestion causes the observer to fire from setting a property and thus requesting a suggestion search.
   * We need a flag to prevent the search
   */
  dontSuggest: false,

  _showDropdown(trigger) {
    if (!trigger.parent().hasClass('show')) {
      trigger.dropdown('toggle');
    }
  },

  _hideDropdown(trigger) {
    if (trigger.parent().hasClass('show')) {
      trigger.dropdown('toggle');
    }
  },

  valueObserver: observer('value', function() {
    let trigger = this.$(DROPDOWN_TRIGGER);
    let value = this.get('value') ? this.get('value').trim() : '';

    if (this.get('dontSuggest')) {
      this.set('dontSuggest', false);
      return;
    }

    if (value && value.length >= this.get('minLengthToTriggerValueChange')) {
      this.get('onValueChange')(value);
    } else {
      this._hideDropdown(trigger);
    }
  }),

  suggestionsObserver: observer('suggestions.[]', function() {
    let trigger = this.$(DROPDOWN_TRIGGER)

    if (this.get('suggestions.length') === 0) {
      this._hideDropdown(trigger);
    } else {
      this._showDropdown(trigger);
    }
  }),

  actions: {

    setValue(value) {
      this._hideDropdown(this.$(DROPDOWN_TRIGGER));
      this.set('dontSuggest', true);
      this.set('value', value);
    }

  }
});
