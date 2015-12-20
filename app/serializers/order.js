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
  },
  serialize(snapshot, options) {
    var json = this._super(...arguments);

    json['@type'] = snapshot.record.get('customer.customerType');

    return json;
  }
});
