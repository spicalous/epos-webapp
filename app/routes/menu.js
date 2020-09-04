import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default class MenuRoute extends Route {

  model() {
    return hash({
      menuItems: this.store.findAll('menu-item', { include: 'categories' }),
      categories: this.store.peekAll('category')
    });
  }
}
