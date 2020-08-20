import ApplicationAdapter from 'epos-webapp/adapters/application';

export default class OrderAdapter extends ApplicationAdapter {

  urlForUpdateRecord(id, modelName, snapshot) {
    let url = super.urlForUpdateRecord(... arguments);
    return snapshot && snapshot.adapterOptions && snapshot.adapterOptions.print
      ? `${url}?print=true`
      : url;
  }

}
