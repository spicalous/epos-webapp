import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default class OrderEatOutRoute extends Route {

  model(params) {
    return hash({
      menuItems: this.store.findAll('menu-item', { include: 'categories,editCategories' }),
      categories: this.store.peekAll('category'),
      editOptions: this.store.findAll('edit-option'),
      order: this.store.findRecord('order/eat-out', params['eat_out_id'], { include: 'orderItems.menuItem,orderItems.editOptions,customer' })
    });
  }
}
