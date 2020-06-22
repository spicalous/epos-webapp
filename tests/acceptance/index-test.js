import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | index', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    this.server.db.emptyData();
  });

  test('visiting /', async function(assert) {
    this.server.create('setting', { name: 'settingName', value: 1 });
    this.server.get('/settings');

    await visit('/');

    assert.equal(currentURL(), '/');
  });

  test('saving a setting', async function(assert) {
    this.server.create('setting', { name: 'settingName', value: 1 });
    this.server.get('/settings');
    this.server.patch('/settings/:id');

    await visit('/');

    assert.ok(this.element.querySelector('[test-id="settings"] .btn:nth-child(2)').getAttribute('class').includes('active'), 'second button active');

    await click('[test-id="settings"] .btn:nth-child(1)');

    assert.notOk(this.element.querySelector('[test-id="settings"] .btn:nth-child(2)').getAttribute('class').includes('active'), 'second button no longer active');
    assert.ok(this.element.querySelector('[test-id="settings"] .btn:nth-child(1)').getAttribute('class').includes('active'), 'first button now active');
  });

  test('reverts and shows error if saving setting', async function(assert) {
    this.server.create('setting', { name: 'settingName', value: 1 });
    this.server.get('/settings');
    this.server.patch('/settings/:id', 500);

    await visit('/');

    assert.ok(this.element.querySelector('[test-id="settings"] .btn:nth-child(2)').getAttribute('class').includes('active'), 'second button active');

    await click('[test-id="settings"] .btn:nth-child(1)');

    assert.ok(this.element.querySelector('.app-overlay'));

    await click('.app-overlay');

    assert.notOk(this.element.querySelector('.app-overlay'));
    assert.ok(this.element.querySelector('[test-id="settings"] .btn:nth-child(2)').getAttribute('class').includes('active'), 'second button still active');
  });
});
