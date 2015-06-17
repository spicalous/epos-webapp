import DS from "ember-data";

export default DS.Model.extend({
  quantity: DS.attr('number'),
  menuItem: DS.belongsTo('menu-item'),

  total: function() {
    return this.get('quantity') * this.get('menuItem').get('price');
  }.property('quantity', 'menuItem'),

  isMenuItem: function(menuItem) {
    return this.get('menuItem').get('name') === menuItem.get('name');
  }
});
