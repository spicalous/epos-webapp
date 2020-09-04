import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { click, fillIn, typeIn, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { UIStub } from 'epos-webapp/tests/util';

module('Integration | Component | menu-item-card', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    this.server.db.emptyData();
    this.owner.register('service:ui', UIStub);
  });

  test('displays menu item info', async function(assert) {
    this.set('menuItem', this.owner.lookup('service:store').createRecord('menu-item', { menuId: '1A', name: 'name', price: 4242 }));

    await render(hbs`<MenuItemCard @menuItem={{this.menuItem}}/>`);

    assert.ok(this.element.textContent.trim().startsWith('1A name'));
    assert.ok(this.element.textContent.trim().includes('42.42'));
    assert.strictEqual(this.element.querySelector('button').textContent.trim(), 'Edit');
  });

  test('input displays menu item price', async function(assert) {
    this.set('menuItem', this.owner.lookup('service:store').createRecord('menu-item', { menuId: '1A', name: 'name', price: 4242 }));

    await render(hbs`<MenuItemCard @menuItem={{this.menuItem}}/>`);
    await click('button');

    assert.strictEqual(this.element.querySelector('input').value, '42.42');
  });

  test('validating editing price', async function(assert) {
    this.set('menuItem', this.owner.lookup('service:store').createRecord('menu-item', { menuId: '1A', name: 'name', price: 4242 }));

    await render(hbs`<MenuItemCard @menuItem={{this.menuItem}}/>`);
    await click('button');

    assert.ok(this.element.querySelector('.btn-primary'));
    assert.notOk(this.element.querySelector('.btn-secondary'));

    // TODO why does these inputs not work ['1.2.3', '1..']
    for (let value of ['']) {
      await fillIn('input', '');
      await typeIn('input', value);
      assert.notOk(this.element.querySelector('.btn-primary'));
      assert.ok(this.element.querySelector('.btn-secondary'));
    }

    for (let value of ['0', '0.0', '0.00', '0.000', '0.1', '1', '1.23', '1.']) {
      await fillIn('input', value);
      assert.ok(this.element.querySelector('.btn-primary'));
      assert.notOk(this.element.querySelector('.btn-secondary'));
    }
  });

  test('saving price error', async function(assert) {
    this.server.create('menuItem', { menuId: '1A', name: 'name', price: 4242 });
    this.server.get('/menu-items/:id');
    this.server.patch('/menu-items/:id', () => ({ errors: [{ detail: 'Error message for menu item update' }]}), 500);

    this.set('menuItem', await this.owner.lookup('service:store').findRecord('menu-item', 1));

    await render(hbs`<MenuItemCard @menuItem={{this.menuItem}}/>`);
    await click('button');
    await fillIn('input', 12.34);
    await click('.btn-primary');

    assert.ok(this.element.querySelector('.btn-primary'));
    assert.strictEqual(this.element.querySelectorAll('button').length, 2);

    const uiService = this.owner.lookup('service:ui');
    assert.strictEqual(uiService.message, 'Error message for menu item update');
  });

  test('saving price success', async function(assert) {
    this.server.create('menuItem', { menuId: '1A', name: 'name', price: 4242 });
    this.server.get('/menu-items/:id');
    this.server.patch('/menu-items/:id');

    this.set('menuItem', await this.owner.lookup('service:store').findRecord('menu-item', 1));

    await render(hbs`<MenuItemCard @menuItem={{this.menuItem}}/>`);
    await click('button');
    await fillIn('input', 12.34);
    await click('.btn-primary');

    assert.ok(this.element.textContent.trim().includes('12.34'));
    assert.strictEqual(this.element.querySelectorAll('button').length, 1);
    assert.strictEqual(this.element.querySelector('button').textContent.trim(), 'Edit');

    const uiService = this.owner.lookup('service:ui');
    assert.strictEqual(uiService.message, 'Updated menu item');
  });
});
