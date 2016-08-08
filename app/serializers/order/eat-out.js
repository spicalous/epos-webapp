import RESTSerializer from 'ember-data/serializers/rest';
import EmbeddedRecordsMixin from 'ember-data/serializers/embedded-records-mixin';

export default RESTSerializer.extend(EmbeddedRecordsMixin, {

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
        json.customer.type = json.customerType.dasherize();
        delete json.customerType;
      }
    }

    return json;
  }

});
