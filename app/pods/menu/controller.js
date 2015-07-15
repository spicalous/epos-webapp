import Ember from 'ember';

export default Ember.Controller.extend({
  filter: '',
  filterMenu: function() {
    var filter = this.get('filter');
    var _this = this;

    if (filter === '') {
       _this.set('model', this.store.all('menu-item'));
    } else {
      var filterPromise = this.store.filter('menu-item', function(menuItem) {
        return menuItem.get('categories').indexOf(filter) > -1;
      });

      filterPromise.then(function(filteredMenu){
        _this.set('model', filteredMenu);
      });
    }
  }.observes('filter')
});
