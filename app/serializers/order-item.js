import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    menuItem: {
      embedded: 'always'
    },
    editOptions: {
      embedded: 'always'
    },
  }
});
