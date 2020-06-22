import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, fillIn, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | form/element', function(hooks) {
  setupRenderingTest(hooks);

  test('onChange, onInput', async function(assert) {
    this.set('onChange', function(event) {
      assert.ok(event);
    });
    this.set('onInput', function(event) {
      assert.ok(event);
    });

    await render(hbs`<Form::Element @onChange={{this.onChange}} @onInput={{this.onInput}}/>`);
    await fillIn('input', 'anything');

    assert.equal(this.element.querySelector('input').value, 'anything');
    assert.expect(3);
  });

  test('suggestion is shown', async function(assert) {
    this.set('onChange', function() {});
    this.set('onInput', function() {});
    this.set('onSuggestionSelected', function() {});

    await render(hbs`<Form::Element @onChange={{this.onChange}}
                                    @onInput={{this.onInput}}
                                    @suggestions={{this.suggestions}}
                                    @onSuggestionSelected={{this.onSuggestionSelected}}/>`);

    assert.notOk(this.element.querySelector('.dropdown-menu'));
    assert.strictEqual(this.element.querySelectorAll('.dropdown-item').length, 0);

    this.set('suggestions', ['suggestion one', 'suggestion two', 'suggestion three']);

    assert.ok(this.element.querySelector('.dropdown-menu'));
    assert.strictEqual(this.element.querySelectorAll('.dropdown-item').length, 3);
  });

  test('clicking inside/outside showing/hiding suggestions', async function(assert) {
    this.set('onChange', function() {});
    this.set('onInput', function() {});
    this.set('onSuggestionSelected', function() {});

    await render(hbs`<div id="outside"></div>
                     <Form::Element @onChange={{this.onChange}}
                                    @onInput={{this.onInput}}
                                    @suggestions={{this.suggestions}}
                                    @onSuggestionSelected={{this.onSuggestionSelected}}/>`);

    this.set('suggestions', ['suggestion one', 'suggestion two', 'suggestion three']);
    assert.ok(this.element.querySelector('.dropdown-menu'));
    assert.strictEqual(this.element.querySelectorAll('.dropdown-item').length, 3);

    await click('#outside');
    assert.notOk(this.element.querySelector('.dropdown-menu'));
    assert.strictEqual(this.element.querySelectorAll('.dropdown-item').length, 0);

    await click('input');
    assert.ok(this.element.querySelector('.dropdown-menu'));
    assert.strictEqual(this.element.querySelectorAll('.dropdown-item').length, 3);
  });

  test('on suggestion selected', async function(assert) {
    this.set('onChange', function() {});
    this.set('onInput', function() {});
    this.set('onSuggestionSelected', function(value) {
      assert.strictEqual(value, 'suggestion one');
    });

    await render(hbs`<Form::Element @onChange={{this.onChange}}
                                    @onInput={{this.onInput}}
                                    @suggestions={{this.suggestions}}
                                    @onSuggestionSelected={{this.onSuggestionSelected}}/>`);

    this.set('suggestions', ['suggestion one', 'suggestion two', 'suggestion three']);

    await click('.dropdown-item');
    assert.expect(1);
  });
});
