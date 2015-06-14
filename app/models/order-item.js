import DS from "ember-data";

export default DS.Model.extend({
  quantity: DS.attr('number'),
  menuItem: DS.attr('menu-item'),
  total: DS.attr('number'),

  isMenuItem: function(menuItem) {
    return this.get('menuItem').get('name') === menuItem.get('name');
  }
});
