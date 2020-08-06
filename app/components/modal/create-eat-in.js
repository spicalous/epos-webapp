import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

const DEFAULT_TABLE_NAME = 'Table ';

export default class ModalCreateEatInComponent extends Component {

  @service store;
  @service ui;

  @tracked newTableName = DEFAULT_TABLE_NAME;
  @tracked newNumberOfGuests = '';

  @computed('newTableName', 'newNumberOfGuests')
  get canCreate() {
    if (this.newNumberOfGuests) {
      let numerical = Number(this.newNumberOfGuests.trim());
      return this.newTableName && !Number.isNaN(numerical) && numerical > 0;
    }
    return this.newTableName;
  }

  @action
  createOrder() {
    let record = this.store.createRecord('order/eat-in', {
      dateTime: new Date(),
      orderItems: A(),
      tableName: this.newTableName,
      numberOfGuests: this.newNumberOfGuests
    });

    record.save()
      .then(() => {
        this.newTableName = DEFAULT_TABLE_NAME;
        this.newNumberOfGuests = '';
        if (this.args.onCreateOrderSuccess) {
          this.args.onCreateOrderSuccess(record);
        }
      })
      .catch(error => {
        console.error('Failed to create order/eat-in', error);
        this.ui.showAppOverlay('Failed to create table :(');
        record.unloadRecord();
      });

    this.args.onCreateOrder();
  }
}
