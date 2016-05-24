import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    orderItems: {
      embedded: 'always'
    },
    customer: {
      embedded: 'always'
    }
  },
  serialize(snapshot, options) {
    var json = this._super(snapshot, options);

    if (json.customer) {
      json.customer.type = snapshot.record.get('customer.customerType');
    }
    if (json.customerType) {
      delete json.customerType;
    }

    return json;
  }
});
