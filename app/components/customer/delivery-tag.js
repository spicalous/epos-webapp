import Component from '@glimmer/component';

export const COLOURS = {
  blue: 'badge-primary',
  grey: 'badge-secondary',
  green: 'badge-success',
  red: 'badge-danger',
  yellow: 'badge-warning',
  teal: 'badge-info'
};

export default class CustomerDeliveryTagComponent extends Component {

  get badgeClass() {
    return COLOURS[this.args.tag.colour] || 'badge-dark';
  }

}
