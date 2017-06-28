import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'li',

  classNames: ['order-item', 'list-group-item'],

  expanded: false,

  editing: false,

  selectedEditCategoryId: null,

  filteredEditOptions: Ember.computed('selectedEditCategoryId', function() {
    let selectedEditCategoryId = this.get('selectedEditCategoryId');
    return this.get('editOptions').filterBy('editCategoryId', parseInt(selectedEditCategoryId));
  }),

  click(event) {
    // only toggle expanded if click events we're not from a modal when editing an item
    if (this.$(event.target).closest('.modal').length === 0) {
      this.toggleProperty('expanded');
    }
  },

  actions: {

    increment() {
      this.get('item').incrementProperty('quantity');
    },

    decrement() {
      this.get('onDecrement')(this.get('item'));
    },

    toggleEdit() {
      this.set('selectedEditCategoryId', this.get('editing') ?
        null :
        this.get('item.menuItem.editCategories.firstObject.id'));

      this.toggleProperty('editing');
    },

    setSelectedEditCategory(editCategory) {
      this.set('selectedEditCategoryId', editCategory.get('id'));
    }

  }
});
