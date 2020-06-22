import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | form/group', function(hooks) {
  setupRenderingTest(hooks);

  test('classes are appended', async function(assert) {
    await render(hbs`<Form::Group class="test-class"/>`);

    assert.equal(this.element.querySelector('.form-group').getAttribute('class'), 'form-group test-class');
  });

  test('attributes are passed to underlying element', async function(assert) {
    this.set('valueOne', 'valueOne');
    this.set('valueTwo', 'valueTwo');
    await render(hbs`<Form::Group as |fg|>
                       <fg.element @value={{this.valueOne}}/>
                       <fg.element @value={{this.valueTwo}}/>
                     </Form::Group>`);

    let inputs = this.element.querySelectorAll('input');
    assert.strictEqual(inputs.length, 2);
    assert.strictEqual(inputs[0].value, 'valueOne');
    assert.strictEqual(inputs[1].value, 'valueTwo');
  });

  test('.was-validated applied to form group', async function(assert) {
    await render(hbs`<Form::Group @validateOnDirty={{false}} as |fg|>
                       <fg.element/>
                     </Form::Group>`);

    await fillIn('input', 'anything');
    assert.notOk(this.element.querySelector('.form-group.was-validated'));
  });

  test('.was-validated not applied if input is dirty and @validateOnDirty={{false}}', async function(assert) {
    await render(hbs`<Form::Group @validateOnDirty={{false}} as |fg|>
                       <fg.element/>
                     </Form::Group>`);

    assert.notOk(this.element.querySelector('.form-group.was-validated'));
    await fillIn('input', 'anything');
    assert.notOk(this.element.querySelector('.form-group.was-validated'));
  });

  test('.was-validated applied if input is dirty and @validateOnDirty={{true}}', async function(assert) {
    await render(hbs`<Form::Group @validateOnDirty={{true}} as |fg|>
                       <fg.element/>
                     </Form::Group>`);

    assert.notOk(this.element.querySelector('.was-validated'));
    await fillIn('input', 'anything');
    assert.ok(this.element.querySelector('.was-validated'));
  });

  test('.was-validated is removed when input is empty and not required', async function(assert) {
    await render(hbs`<Form::Group @validateOnDirty={{true}} as |fg|>
                       <fg.element/>
                     </Form::Group>`);

    await fillIn('input', 'anything');
    assert.ok(this.element.querySelector('.was-validated'));
    await fillIn('input', '');
    assert.notOk(this.element.querySelector('.was-validated'));
  });

  test('.was-validated remains when input is empty and required', async function(assert) {
    await render(hbs`<Form::Group @validateOnDirty={{true}} as |fg|>
                       <fg.element @required={{true}}/>
                     </Form::Group>`);

    await fillIn('input', 'anything');
    assert.ok(this.element.querySelector('.was-validated'));
    await fillIn('input', '');
    assert.ok(this.element.querySelector('.was-validated'));
  });

  test('invalid feedback is hidden', async function(assert) {
    await render(hbs`<Form::Group @validateOnDirty={{true}} @invalidFeedback="This is invalid feedback" as |fg|>
                       <fg.element @required={{true}}/>
                     </Form::Group>`);
    let styles = getComputedStyle(this.element.querySelector('.invalid-feedback'));
    assert.strictEqual(styles.getPropertyValue('display'), 'none');
  });

  test('invalid feedback is shown when .was-validated class is applied and input is invalid', async function(assert) {
    await render(hbs`<Form::Group @validateOnDirty={{true}} @invalidFeedback="This is invalid feedback" as |fg|>
                       <fg.element @required={{true}} @pattern="[0-9]+"/>
                     </Form::Group>`);

    await fillIn('input', 'no numbers');
    assert.ok(this.element.querySelector('.was-validated'));

    let element = this.element.querySelector('.invalid-feedback');
    assert.strictEqual(getComputedStyle(element).getPropertyValue('display'), 'block');
    assert.strictEqual(element.textContent.trim(), 'This is invalid feedback');
  });
});
