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

  filterMenu: Ember.observer('model.menu', 'selectedCategory', 'numpadValue', function() {
    const categoryFilter = this.get('selectedCategory');
    const menuIdFilter = this.get('numpadValue');
    let menuItems = this.get('model.menu');

    if (categoryFilter) {
      menuItems = menuItems.filter((item) =>
        item.get('categories').any((category) => categoryFilter === category));
    }
    if (menuIdFilter) {
      menuItems = menuItems.filter((item) => item.get('menuId').startsWith(menuIdFilter));
    }

    this.set('menuItems', menuItems);
  }),

  /**
   * @type {MenuItem[]}
   * menu items sorted by ascending id
   */
  sortedMenu: Ember.computed.sort('menuItems', (x, y) => x.get('id') - y.get('id')),

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
