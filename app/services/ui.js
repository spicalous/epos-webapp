import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { A } from '@ember/array';
import { cancel, later } from '@ember/runloop';
import { TOAST_TRANSITION_DURATION_MS } from './../components/toast';
import Ember from 'ember';

const TOAST_DEFAULT_DURATION_MS = 500;

export default class UiService extends Service {

  appModalContainerId = 'app-modal-container';

  @tracked appOverlayShown = false;
  @tracked appLoaderShown = false;
  @tracked confirmShown = false;
  @tracked model = {};
  toastModels = A([]);

  @action
  showToast(message, durationMillis) {
    durationMillis = durationMillis || TOAST_DEFAULT_DURATION_MS;
    let toastModel = { message, durationMillis };

    toastModel.timer = later(this, function() {
      this.toastModels.removeObject(toastModel);
    }, Ember.testing ? 5 : (2 * TOAST_TRANSITION_DURATION_MS) + durationMillis + 1);

    this.toastModels.pushObject(toastModel);
  }

  @action
  removeToast(toastModel) {
    cancel(toastModel.timer);
    this.toastModels.removeObject(toastModel);
  }

  @action
  showAppOverlay(title, message, onDismiss) {
    this.model = { title, message, onDismiss };
    this.appOverlayShown = true;
  }

  @action
  dismissAppOverlay() {
    this.appOverlayShown = false;
    if (this.model.onDismiss) {
      this.model.onDismiss();
    }
    this.model = {};
  }

  @action
  showAppLoader(message) {
    this.model = { message };
    this.appLoaderShown = true;
  }

  @action
  dismissAppLoader() {
    this.appLoaderShown = false;
    this.model = {};
  }

  @action
  showConfirm(title, message, onConfirm, btnClass, btnText) {
    this.confirmShown = true;
    this.model = { title, message, onConfirm, btnClass, btnText };
  }

  @action
  onDismissConfirm() {
    this.confirmShown = false;
    this.model = {};
  }

  @action
  onConfirmConfirm() {
    this.confirmShown = false;
    if (this.model.onConfirm) {
      this.model.onConfirm();
    }
  }

}
