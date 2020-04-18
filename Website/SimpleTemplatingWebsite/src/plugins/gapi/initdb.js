/* Initialize a new database from the projecttemplate database */

let finish_cb;
let error_cb = function(error) {
  console.log(error.result.error.message);
};
let payload;

/* 1 initialize : copy the sheet "database" from projecttemplate database to freshly created database */
export function initDb(pl, callback) {
  payload = pl;
  finish_cb = callback;

  const params = {
    spreadsheetId: payload.source_database,
    sheetId: 0,
  };

  const copySheetToAnotherSpreadsheetRequestBody = {
    destinationSpreadsheetId: payload.destination_database,
  };

  const request = window.gapi.client.sheets.spreadsheets.sheets.copyTo(
    params,
    copySheetToAnotherSpreadsheetRequestBody
  );

  request.then(initDb_deletFirstSheet, error_cb);
}

/* 2 delete "Sheet 1" */
function initDb_deletFirstSheet(response) {
  var request = window.gapi.client.sheets.spreadsheets.batchUpdate({
    spreadsheetId: payload.destination_database,
    requests: [
      {
        deleteSheet: {
          sheetId: 0,
        },
      },
    ],
  });

  request.then(initDb_listSheets, error_cb);
}

/* 3 Retrieve copied sheet ID */
function initDb_listSheets(response) {
  window.gapi.client.sheets.spreadsheets
    .get({
      spreadsheetId: payload.destination_database,
    })
    .then(initDb_renameCopyedSheet, error_cb);
}

/* 4 Rename properly */
function initDb_renameCopyedSheet(response) {
  window.gapi.client.sheets.spreadsheets
    .batchUpdate({
      spreadsheetId: payload.destination_database,
      requests: [
        {
          updateSheetProperties: {
            properties: {
              title: "database",
              sheetId: response.result.sheets[0].properties.sheetId,
            },
            fields: "title",
          },
        },
      ],
    })
    .then(function(response) {
      if (finish_cb) finish_cb(response);
    }, error_cb);
}
