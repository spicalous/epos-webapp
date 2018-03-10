import { moduleFor, test } from 'ember-qunit';

moduleFor('route:order/view', 'Unit | Route | order/view', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('saves scroll position when transitioning to order.edit.eat-out', function(assert) {
  let route = this.subject();
  route._getScrollPosition = () => 42;

  route.send('willTransition', { targetName: "order.edit.eat-out" });

  assert.equal(route.get('currentScrollPosition'), 42);
});

test('does not save scroll position when not transitioning to order.edit.eat-out', function(assert) {
  let route = this.subject();

  route.send('willTransition', { targetName: "poop" });

  assert.equal(route.get('currentScrollPosition'), 0);
});
