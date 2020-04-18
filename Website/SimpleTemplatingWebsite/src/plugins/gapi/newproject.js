import { initDb } from "./initdb";
import { createFile } from "./drive";
import { initTemplate } from "./initTemplate";

let finish_cb;
let error_cb = function(error) {
  console.log(error.result.error.message);
};

let payload;

let returnedData = {
  folderRoot: null,
  database: null,
  template: null,
  folderExport: null,
};

export function newProject(pl, callback) {
  payload = pl;
  finish_cb = callback;

  var createFilePayload = {
    name: payload.name + " - Simple Templating Project",
    type: "folder",
  };

  if (payload.parent) {
    createFilePayload.parent = payload.parent.id;
  }

  // Create project root folder
  createFile(createFilePayload, function(fldr) {
    returnedData.folderRoot = fldr;

    // Ccreate DB
    createFile(
      {
        name: payload.name + " - Database",
        type: "spreadsheet",
        parent: returnedData.folderRoot.id,
      },
      function(db) {
        returnedData.database = db;

        var pld = {
          source_database: payload.projectTemplate.database_id,
          destination_database: db.id,
        };

        initDb(pld);

        // Ccreate template
        createFile(
          {
            name: payload.name + " - Template",
            type: "presentation",
            parent: returnedData.folderRoot.id,
          },
          function(tmpl) {
            returnedData.template = tmpl;

            var plt = {
              source_template: payload.projectTemplate.template_id,
              destination_template: tmpl.id,
            };

            initTemplate(plt);

            // Ccreate Export folder
            createFile(
              {
                name: payload.name + " - Export",
                type: "folder",
                parent: returnedData.folderRoot.id,
              },
              function(xprtfldr) {
                returnedData.folderExport = xprtfldr;
                finish_cb(returnedData);
              }
            );
          }
        );
      }
    );
  });
}
