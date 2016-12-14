import Ember from 'ember';

export default Ember.Controller.extend({

  orderService: Ember.inject.service('order'),

  /**
   * @type {Category}
   * @see {@link models/category}
   */
  selectedCategory: null,

  /**
   * used for filtering the menu
   * @type {string}
   */
  numpadValue: '',

  /**
   * @type {MenuItem[]}
   * menu items sorted by ascending id
   */
  sortedMenu: Ember.computed.sort('model.menu', (x, y) => x.get('id') - y.get('id')),

  actions: {

    selectCategory(category) {
      this.set('selectedCategory', this.get('selectedCategory') === category ? null : category);
    },

    addMenuItem(menuItem) {
      this.get('orderService').add(menuItem);
      this.set('numpadValue', '');
      this.send('showMessage', 'toast', {
        body: 'Added ' + menuItem.get('name')
      });
    },

    onNumpadValueChange(value) {
      this.set('numpadValue', value);
    },

    reset() {
      this.set('numpadValue', '');
      this.set('selectedCategory', null);
    }

  }
});
