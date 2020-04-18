// payload.type can be spreadsheet / presentation / folder
// payload.parent must be an id

export function createFile(payload, callback) {
  let createObject = {
    name: payload.name,
    mimeType: "application/vnd.google-apps." + payload.type,
    fields: "id,name",
  };

  if (payload.parent) {
    createObject.parents = [payload.parent];
  }

  window.gapi.client.drive.files.create(createObject).then(function(response) {
    callback(response.result);
  });
}

export function duplicateFile(payload, callback) {
  let createObject = {
    fileId: payload.fileId,
    name: payload.name,
    fields: "id,name",
  };

  if (payload.parent) {
    createObject.parents = [payload.parent];
  }

  window.gapi.client.drive.files.copy(createObject).then(function(response) {
    callback(response.result);
  });
}

export function filePicker(type, callback) {
  function cb(data) {
    callback(data.docs[0]);
  }

  var token = window.gapi.auth2.getAuthInstance().currentUser.get().tc
    .access_token;

  var view = new window.google.picker.DocsView(
    window.google.picker.ViewId[type]
  );

  if (type == "FOLDERS") {
    view.setIncludeFolders(true);
    view.setSelectFolderEnabled(true);
  }

  var picker = new window.google.picker.PickerBuilder()
    .enableFeature(window.google.picker.Feature.NAV_HIDDEN)
    .setOAuthToken(token)
    .addView(view)
    .addView(new window.google.picker.DocsUploadView())
    .setCallback(cb)
    .build();

  picker.setVisible(true);
}
