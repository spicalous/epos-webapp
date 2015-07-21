import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  namespace: 'EPOSDataService-1.0-SNAPSHOT/api'
});
