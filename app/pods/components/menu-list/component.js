import Ember from 'ember';

export default Ember.Component.extend({

  /**
   * @type {Category}
   * @see {@link models/category}
   */
  categoryFilter: null,

  /**
   * @type {string}
   */
  menuIdFilter: null,

  filterMenu: Ember.on('init', Ember.observer('categoryFilter', 'menuIdFilter', function() {
    var menuItems = this.get('menu'),
        categoryFilter = this.get('categoryFilter'),
        menuIdFilter = this.get('menuIdFilter');

    if (categoryFilter) {
      menuItems = menuItems
          .filter((item) => item.get('categories')
              .any((category) => categoryFilter === category));
    }
    if (menuIdFilter) {
      menuItems = menuItems
          .filter((item) => item.get('menuId').startsWith(menuIdFilter));
    }

    this.set('menuItems', menuItems);
  })),

  actions: {

    clickedMenuItem(menuItem) {
      this.get('onMenuItemClick')(menuItem);
    }

  }

});
