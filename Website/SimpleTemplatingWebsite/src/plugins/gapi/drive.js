export function filePicker(type, callback) {
  function cb(data) {
    callback(data.docs[0]);
  }

  var token = gapi.auth2.getAuthInstance().currentUser.je.uc.access_token;

  var view = new google.picker.DocsView(google.picker.ViewId[type]);

  if (type == "FOLDERS") {
    view.setIncludeFolders(true);
    view.setSelectFolderEnabled(true);
  }

  var picker = new google.picker.PickerBuilder()
    .enableFeature(google.picker.Feature.NAV_HIDDEN)
    .setOAuthToken(token)
    .addView(view)
    .addView(new google.picker.DocsUploadView())
    .setCallback(cb)
    .build();

  picker.setVisible(true);
}

export function createDb(name, callback) {
  gapi.client.drive.files
    .create({
      name: name + " - database",
      mimeType: "application/vnd.google-apps.spreadsheet",
      fields: "*"
    })
    .then(function(response) {
      callback(response.result);
    });
}
