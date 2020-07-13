import Component from '@glimmer/component';
import { action } from '@ember/object';
import { cancel, later } from '@ember/runloop';
import Ember from 'ember';

export const TOAST_TRANSITION_DURATION_MS = 150; // value from css

export default class ToastComponent extends Component {

  @action
  animateShow(element) {
    element.classList.add('fade');
    element.offsetHeight; // reflow (otherwise animation doesn't happen on some browsers
    element.classList.add('showing');
    this._onShowCompleteTimer = later(this, function() {

      element.classList.remove('showing');
      element.classList.add('show');
      this._onHideTimer = later(this, this.hide, Ember.testing ? 1 : this.args.model.durationMillis);

    }, Ember.testing ? 1 : TOAST_TRANSITION_DURATION_MS);
  }

  @action
  hide() {
    cancel(this._onShowCompleteTimer);
    cancel(this._onHideTimer);
    this.rootElement.classList.remove('show');

    this._removeTimer = later(this, function() {
      this.args.removeFromDOM(this.args.model);
    }, Ember.testing ? 1 : TOAST_TRANSITION_DURATION_MS);
  }

  willDestroy() {
    cancel(this._onShowCompleteTimer);
    cancel(this._onHideTimer);
    cancel(this._removeTimer);
  }
}
