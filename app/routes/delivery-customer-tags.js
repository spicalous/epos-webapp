import Route from '@ember/routing/route';

export default class DeliveryCustomerTagsRoute extends Route {

  model() {
    return this.store.findAll('delivery-customer-tag');
  }
}
