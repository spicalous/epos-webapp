import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Integration | Component | app-setting/radio', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    this.server.db.emptyData();
  });

  test('renders correctly', async function(assert) {
    this.server.create('setting', { name: 'settingName', value: 1 });
    this.server.get('/settings/:id');
    let setting = await this.owner.lookup('service:store').findRecord('setting', 1);
    this.set('setting', setting);
    this.set('name', setting.get('name'));
    this.set('value', setting.get('value'));
    this.set('values', [0, 1, 2]);
    this.set('updateSettingFn', () => {});

    await render(hbs`<AppSetting::Radio @setting={{this.setting}}
                                        @name={{this.name}}
                                        @value={{this.value}}
                                        @values={{this.values}}
                                        @updateSetting={{this.updateSettingFn}} />`);

    assert.strictEqual(this.element.querySelector('.col-12:nth-child(1)').textContent.trim(), 'settingName', 'setting name');
    assert.strictEqual(this.element.querySelector('.btn:nth-child(1)').textContent.trim(), '0', 'first value');
    assert.strictEqual(this.element.querySelector('.btn:nth-child(2)').textContent.trim(), '1', 'second value');
    assert.strictEqual(this.element.querySelector('.btn:nth-child(3)').textContent.trim(), '2', 'third value');
    assert.ok(this.element.querySelector('.btn:nth-child(2)').getAttribute('class').includes('active'), 'second button active');
  });

  test('executes callback function when clicked', async function(assert) {
    this.server.create('setting', { name: 'settingName', value: 1 });
    this.server.get('/settings/:id');
    this.server.patch('/settings/:id');
    let setting = await this.owner.lookup('service:store').findRecord('setting', 1);
    this.set('setting', setting);
    this.set('values', [0, 1, 2]);
    this.set('updateSettingFn', (setting, newValue) => {
      setting.set('value', newValue);
      setting.save();
      assert.strictEqual(newValue, 2, 'save setting called with new value');
    });

    await render(hbs`<AppSetting::Radio @setting={{this.setting}}
                                        @name={{this.setting.name}}
                                        @value={{this.setting.value}}
                                        @values={{this.values}}
                                        @updateSetting={{this.updateSettingFn}}/>`);

    assert.ok(this.element.querySelector('.btn:nth-child(2)').getAttribute('class').includes('active'), 'second button active');

    await click('.btn:nth-child(3)');

    assert.notOk(this.element.querySelector('.btn:nth-child(2)').getAttribute('class').includes('active'), 'second button no longer active');
    assert.ok(this.element.querySelector('.btn:nth-child(3)').getAttribute('class').includes('active'), 'third button now active');
    assert.expect(4);
  });

});
