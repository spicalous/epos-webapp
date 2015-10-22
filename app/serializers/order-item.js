import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    menuItem: {
      serialize: 'records',
      deserialize: 'ids'
    },
    editOptions: {
      serialize: 'records',
      deserialize: 'ids'
    },
  }
});
