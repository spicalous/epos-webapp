import Component from '@glimmer/component';
import { next } from '@ember/runloop';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Ember from 'ember';

export default class ModalDialogComponent extends Component {

  @service ui;

  getRootElement() {
    return Ember.testing
      ? document.querySelector('#ember-testing')
      : document.body;
  }

  @action
  showModal(element) {
    let rootElement = this.getRootElement();
    rootElement.classList.add('modal-open');

    element.classList.add('d-block');

    this.backdrop = document.createElement('div');
    this.backdrop.className = 'modal-backdrop fade';
    rootElement.append(this.backdrop);

    // History mentioned here https://github.com/twbs/bootstrap/pull/17997
    // Summary:
    // Some browsers are lazy when updating dom elements after transition effects.
    // This can be fixed by reading element properties such as offsetHeight or offsetWidth,
    // which causes the browser to resync (reflow) the element.
    element.offsetHeight;
    this.backdrop.offsetHeight;

    next(this, function() {
      element.classList.add('show');
      this.backdrop.classList.add('show');
    });
  }

  @action
  hideModal() {
    this.modalElement.classList.remove('show');
    this.modalElement.classList.remove('d-block');
    this.backdrop.remove();
    let rootElement = this.getRootElement();
    let noOtherModalsOpen = Array.from(rootElement.children)
      .every(element => !element.classList.contains('modal-backdrop'));

    if (noOtherModalsOpen) {
      rootElement.classList.remove('modal-open');
    }
  }

  @action
  dismiss() {
    this.hideModal();
    if (this.args.onDismiss) {
      this.args.onDismiss();
    }
  }

  @action
  confirm() {
    this.hideModal();
    if (this.args.onConfirm) {
      this.args.onConfirm();
    }
  }
}
