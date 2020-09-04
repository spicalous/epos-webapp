import { module, test } from 'qunit';
import { visit, click, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | menu', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    this.server.db.emptyData();
    this.server.loadFixtures('menuItems', 'categories', 'editCategories');
    this.server.get('/menu-items');
  });

  test('displays categories', async function(assert) {
    await visit('/menu');

    assert.strictEqual(this.element.querySelectorAll('.container button').length, 19);
  });

  test('selecting category displays menu items', async function(assert) {
    await visit('/menu');
    await click('.container button');

    assert.strictEqual(this.element.querySelectorAll('.card').length, 29);
  });

  test('editing menu items failure', async function(assert) {
    this.server.patch('/menu-items/:id', () => ({ errors: [{ detail: 'Error message for menu item update' }]}), 500);

    await visit('/menu');
    await click('.container button');
    await click('.card .btn-main-secondary');
    await fillIn('.card input', '12.34');
    await click('.card .btn-primary');

    assert.strictEqual(this.element.querySelector('.app-overlay h2').textContent.trim(), 'Failed to update menu item :(');
    assert.ok(this.element.querySelector('.app-overlay').textContent.trim().includes('Error message for menu item update'));

    assert.ok(this.element.querySelector('.card input'), 'still in edit state');
    assert.strictEqual(this.element.querySelector('.card input').value, '12.34');
    assert.ok(this.element.querySelector('.card .btn-primary'), 'still in edit state');
  });

  test('editing menu items success', async function(assert) {
    await visit('/menu');
    await click('.container button');
    await click('.card .btn-main-secondary');
    await fillIn('.card input', '12.34');
    await click('.card .btn-primary');

    let menuItemCardBody = this.element.querySelector('.card-body');
    assert.ok(menuItemCardBody.textContent.trim().startsWith('SET MENU A (2pp)'));
    assert.ok(menuItemCardBody.textContent.trim().includes('12.34'));
  });
});
