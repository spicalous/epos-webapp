import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

function adjustByLocalTimezoneOffset(value, offset) {
  let num = value - offset;
  return num < 10 ? `0${num}` : num;
}

module('Integration | Helper | format-date-time', function(hooks) {
  setupRenderingTest(hooks);

  test('format date time with null', async function(assert) {
    this.set('inputValue', null);
    await render(hbs`{{format-date-time inputValue}}`);
    assert.equal(this.element.textContent.trim(), '');
  });

  test('format date time with empty string', async function(assert) {
    this.set('inputValue', '');
    await render(hbs`{{format-date-time inputValue}}`);
    assert.equal(this.element.textContent.trim(), '');
  });

  test('format date time with undefined', async function(assert) {
    await render(hbs`{{format-date-time inputValue}}`);
    assert.equal(this.element.textContent.trim(), '');
  });

  test('format date time with string date', async function(assert) {
    this.set('inputValue', 'Sat Sep 12 1992 00:00:00 GMT+0000 (GMT)');
    await render(hbs`{{format-date-time inputValue}}`);
    let expectedHours = adjustByLocalTimezoneOffset(0, new Date().getTimezoneOffset() / 60);
    let expectedMinutes = adjustByLocalTimezoneOffset(0, new Date().getTimezoneOffset() % 60);
    assert.equal(this.element.textContent.trim(), `1992/09/12 - ${expectedHours}:${expectedMinutes}`);
  });

  test('format date time with Date object', async function(assert) {
    this.set('inputValue', new Date('Sat Sep 12 1992 00:00:00 GMT+0000 (GMT)'));
    await render(hbs`{{format-date-time inputValue}}`);
    let expectedHours = adjustByLocalTimezoneOffset(0, new Date().getTimezoneOffset() / 60);
    let expectedMinutes = adjustByLocalTimezoneOffset(0, new Date().getTimezoneOffset() % 60);
    assert.equal(this.element.textContent.trim(), `1992/09/12 - ${expectedHours}:${expectedMinutes}`);
  });

});
