import { A } from '@ember/array';
import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default class OrderNewRoute extends Route {

  model() {
    return hash({
      menuItems: this.store.findAll('menu-item', { include: 'categories,editCategories' }),
      categories: this.store.peekAll('category'),
      editOptions: this.store.findAll('edit-option'),
      order: this.get('store').createRecord('order/eat-out', {
        dateTime: new Date(),
        orderItems: A(),
        paymentMethod: null,
        notes: null,
        customer: null,
        estimatedTime: 45,
      })
    });
  }
}
