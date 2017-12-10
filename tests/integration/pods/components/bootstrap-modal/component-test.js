import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bootstrap-modal', 'Integration | Component | bootstrap modal', {
  integration: true
});

test('it renders', function(assert) {

  let doneOne = assert.async();
  let doneTwo = assert.async();
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.set('title', 'modal title');
  this.set('message', 'modal message');

  this.render(hbs`{{bootstrap-modal title=title message=message}}`);

  $('.modal').on('shown.bs.modal', (e) => {
    assert.equal(this.$('.modal-title').text().trim(), 'modal title');
    assert.equal(this.$('.modal-body').text().trim(), 'modal message');
    this.$('button.close').click();
    doneOne();
  });
});

test('it renders template block', function(assert) {

  // Template block usage:
  this.render(hbs`
    {{#bootstrap-modal}}
      template block text
    {{/bootstrap-modal}}
  `);

  $('.modal').on('shown.bs.modal', (e) => {
    assert.equal(this.$().text().trim(), 'template block text');
    this.$('button.close').click();
    doneTwo();
  });

});
