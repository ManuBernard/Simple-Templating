export function createNewProject(payload, callback) {
  console.log(payload);
  let data = {
    folderRoot: null,
    database: null,
    template: null,
    folderExport: null
  };

  // Create project root folder
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
          fileId: payload.projectTemplate.database_id,
          parent: data.folderRoot.id
        },
        function(db) {
          data.database = db;

          // Ccreate template
          duplicateFile(
            {
              name: payload.name + " - Template",
              fileId: payload.projectTemplate.template_id,
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

// payload.type can be spreadsheet / presentation / folder
// payload.parent must be an id

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
