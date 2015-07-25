import DS from "ember-data";

export default DS.Model.extend({
  type: DS.attr('number'),
  name: DS.attr('string'),
  price: DS.attr('number'),

  selected: DS.attr('boolean'),

  displayPrice: function() {
    return this.get('price') === 0 ?
      '' :
      (this.get('price') / 100).toFixed(2);
  }.property('price'),
});
