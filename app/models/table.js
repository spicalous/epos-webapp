import DS from 'ember-data';

export default DS.Model.extend({
  tableId: DS.attr('string'),
  status: DS.attr('string')
});
