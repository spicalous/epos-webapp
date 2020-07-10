import Route from '@ember/routing/route';

export default class OrdersEatInRoute extends Route {

  model() {
    return this.store.findAll('order/eat-in', { reload: true });
  }

}
