import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default class MenuController extends Controller {

  @computed('model.menuItems.[]')
  get noCategoryMenuItems() {
    return this.model.menuItems.filter(menuItem => menuItem.categories.length === 0);
  }

  @computed('model.{categories.[],menuItems.[]}')
  get categoriesAndMenuItems() {
    return this.model.categories.map(category => {
      return {
        category,
        menuItems: this.model.menuItems.filter(menuItem => menuItem.categories.includes(category))
      };
    });
  }

}
