import OrderAdapter from 'epos-webapp/adapters/order';

export default class OrderEatOutAdapter extends OrderAdapter {

  urlForCreateRecord() {
    return `${super.urlForCreateRecord(...arguments)}?print=true`;
  }
}
