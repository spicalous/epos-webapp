import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'li',

  classNames: ['order-item-list-item', 'list-group-item'],

  expanded: false,

  outsideClickHandler: null,

  didInsertElement() {
    this.set('outsideClickHandler', Ember.run.bind(this, '_handleOutsideClick'));
  },

  willDestroyElement() {
    this._removeClickHandler();
  },

  _handleOutsideClick(event) {
    let $element = this.$();
    let $target = this.$(event.target);

    if (!$target.closest($element).length && !$target.closest('#edit-item-modal').length) {
      this.set('expanded', false);
      this._removeClickHandler();
    }
  },

  _addClickHandler() {
    Ember.$(document).on('click', this.get('outsideClickHandler'));
  },

  _removeClickHandler() {
    Ember.$(document).off('click', this.get('outsideClickHandler'));
  },

  actions: {

    toggleExpanded() {
      const expanded = !this.get('expanded');
      this.set('expanded', expanded);

      if (expanded) {
        this._addClickHandler();
      } else {
        this._removeClickHandler();
      }
    },

    incrementItem(orderItem) {
      orderItem.incrementProperty('quantity');
    },

    decrementItem(orderItem) {
      this.get('onDecrementItem')(orderItem);
    },

    onEditItem(orderItem) {
      this.get('onEditItem')(orderItem);
    }

  }
});
