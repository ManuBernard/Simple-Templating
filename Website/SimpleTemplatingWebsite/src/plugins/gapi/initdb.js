/* Initialize a new database from the projecttemplate database */

let finish_cb;
let error_cb = function(error) {
  console.log(error.result.error.message);
};
let payload;

/* 1 initialize : copy the sheet "database" from projecttemplate database to freshly created database */
export function initDb(db) {
  var values = [
    ["title", "description"],
    ["Hello", "you"],
    ["welcome", "to"],
    ["Simple", "Templating"],
  ];
  var body = {
    values: values,
  };
  window.gapi.client.sheets.spreadsheets.values
    .update({
      spreadsheetId: db.id,
      range: "Sheet1",
      valueInputOption: "RAW",
      resource: body,
    })
    .then((response) => {
      var result = response.result;
      console.log(`${result.updatedCells} cells updated.`);
    });
}
