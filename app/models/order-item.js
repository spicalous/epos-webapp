import DS from 'ember-data';

export default DS.Model.extend({
  quantity: DS.attr('number'),
  menuItem: DS.belongsTo('menu-item'),
  editOptions: DS.hasMany('edit-option'),

  total: function() {
    return this.get('quantity') * (this.get('menuItem.price') + this.get('editOptionTotal'));
  }.property('quantity', 'menuItem', 'editOptions.[]'),

  editOptionTotal: function() {
    return this.get('editOptions').reduce(
      function(prev, item) {
        return prev + item.get('price');
      }, 0);
  }.property('editOptions.[]'),

  isMenuItem: function(menuItem) {
    return this.get('menuItem').get('id') === menuItem.get('id');
  },

  hasNoEditOptions: function() {
    return this.get('editOptions').get('length') === 0;
  },

  toggleOption: function(option) {
    var editOptions = this.get('editOptions');

    if (editOptions.indexOf(option) === -1) {
      editOptions.pushObject(option);
    } else {
      editOptions.removeObject(option);
    }
  }
});
