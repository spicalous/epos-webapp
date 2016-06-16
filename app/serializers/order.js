import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    orderItems: {
      embedded: 'always'
    },
    customer: {
      embedded: 'always'
    }
  }
});
