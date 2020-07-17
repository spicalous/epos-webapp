import Service from '@ember/service';

export function splitByNewline(textContent) {
  return textContent.trim().split('\n').map(s => s.trim()).filter(s => !!s);
}

export class UIStub extends Service {

  showToast(message) {
    this.message = message;
  }

  showConfirm(title, message, callback, btnClass, btnText) {
    this.title = title;
    this.message = message;
    this.callback = callback;
    this.btnClass = btnClass;
    this.btnText = btnText;
  }

}
