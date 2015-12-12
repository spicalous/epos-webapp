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
  serialize(record) {
    var json = this._super(...arguments);

    json.customer.type = json.customerType;

    delete json.customerType;

    return json;
  }
});
