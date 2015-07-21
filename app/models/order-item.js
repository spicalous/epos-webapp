import DS from 'ember-data';

export default DS.Model.extend({
  quantity: DS.attr('number'),
  menuItem: DS.belongsTo('menu-item'),

  total: function() {
    return this.get('quantity') * this.get('menuItem').get('price');
  }.property('quantity', 'menuItem'),

  displayTotal: function() {
    return (this.get('total') / 100).toFixed(2);
  }.property('total'),

  isMenuItem: function(menuItem) {
    return this.get('menuItem').get('name') === menuItem.get('name');
  }
});
