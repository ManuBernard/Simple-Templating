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
    .then(() => {});
}
