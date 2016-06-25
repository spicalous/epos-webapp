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
      if (json.customerType) {
        json.customer.type = json.customerType;
        delete json.customerType;
      }
    }

    return json;
  }
});
