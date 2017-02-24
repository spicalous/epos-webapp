import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('restaurant-table', 'Integration | Component | restaurant table', {
  integration: true,

  beforeEach: function() {
    this.inject.service('store', { as: 'store' });
  }
});

test('it renders', function(assert) {
  assert.expect(2);

  Ember.run(() => {
    this.set('table', this.store.createRecord('table', {
      tableId: '1',
      status: 'TABLE_STATUS'
    }));
  });

  this.render(hbs`{{restaurant-table table=table}}`);

  assert.equal(this.$('.restaurant-table .table-id').text().trim(), '1');
  assert.equal(this.$('.restaurant-table .dropdown button').text().trim(), 'TABLE STATUS');
});
