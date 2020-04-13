// payload.type can be spreadsheet / presentation / folder
// payload.parent must be an id

const driveTemplateIds = {
  default: {
    template: "1ufrnbiGqqo2for8Oqtwm5K9OH_meIBihg7LZBdl24cY",
    database: "1DOdWy4ldUtaoFSjCZKFWgrf8yXNQol4eKrdQRLNSE1g"
  }
};

export function createFile(payload, callback) {
  let createObject = {
    name: payload.name,
    mimeType: "application/vnd.google-apps." + payload.type,
    fields: "id,name"
  };

  if (payload.parent) {
    createObject.parents = [payload.parent];
  }

  window.gapi.client.drive.files.create(createObject).then(function(response) {
    callback(response.result);
  });
}

export function createNewProject(payload, callback) {
  let data = {
    folderRoot: null,
    database: null,
    template: null,
    folderExport: null
  };

  // Create Folder
  createFile(
    {
      name: payload.name + " - Simple Templating Project",
      type: "folder"
    },
    function(fldr) {
      data.folderRoot = fldr;

      // Ccreate DB
      duplicateFile(
        {
          name: payload.name + " - Database",
          fileId: driveTemplateIds.default.database,
          parent: data.folderRoot.id
        },
        function(db) {
          data.database = db;

          // Ccreate template
          duplicateFile(
            {
              name: payload.name + " - Template",
              fileId: driveTemplateIds.default.template,
              parent: data.folderRoot.id
            },
            function(tmpl) {
              data.template = tmpl;

              // Ccreate Export folder
              createFile(
                {
                  name: payload.name + " - Export",
                  type: "folder",
                  parent: data.folderRoot.id
                },
                function(xprtfldr) {
                  data.folderExport = xprtfldr;

                  callback(data);
                }
              );
            }
          );
        }
      );
    }
  );
}

export function duplicateFile(payload, callback) {
  let createObject = {
    fileId: payload.fileId,
    name: payload.name,
    fields: "id,name"
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
  console.log(window.gapi.auth2.getAuthInstance().currentUser.get());
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

// export function createDb (name, callback) {
//   window.gapi.client.drive.files
//     .create({
//       name: name + " - database",
//       mimeType: "application/vnd.google-apps.spreadsheet",
//       fields: "*"
//     })
//     .then(function (response) {
//       callback(response.result);
//     });
// }

// export function createFolder (name, callback) {
//   window.gapi.client.drive.files
//     .create({
//       name: name + " - database",
//       mimeType: "application/vnd.google-apps.spreadsheet",
//       fields: "*"
//     })
//     .then(function (response) {
//       callback(response.result);
//     });
// }
