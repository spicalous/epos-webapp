import Ember from "ember";

export default Ember.Controller.extend({
  filter: '',
  filterMenu: function() {
    var filter = this.get('filter');
    var _this = this;

    var filterPromise = this.store.filter('menu-item', function(menuItem) {
      if (filter === '') {
        return true;
      }
      return menuItem.get('categories').indexOf(filter) > -1;
    });

    filterPromise.then(function(filteredMenu){
      _this.set('model', filteredMenu);
    });
  }.observes('filter')
});
