import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    orderItems: {
      serialize: 'records',
      deserialize: 'ids'
    },
    customer: {
      serialize: 'records'
    }
  }
});
