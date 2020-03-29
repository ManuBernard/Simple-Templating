function getJsonArrayFromData(data) {
  var obj = {};
  var result = [];
  var headers = data[0];
  var cols = headers.length;
  var row = [];

  for (var i = 1, l = data.length; i < l; i++) {
    // get a row to fill the objectx
    row = data[i];
    // clear object
    obj = {};
    for (var col = 0; col < cols; col++) {
      // fill object with new values
      if (headers[col].substring(0, 1) == "#") {
        headers[col] = headers[col].toUpperCase();
      }
      obj[headers[col]] = row[col];
    }
    // add object in a final result
    result.push(obj);
  }

  return result;
}

export function readDatabase(id, callback) {
  window.gapi.client.sheets.spreadsheets.values
    .get({
      spreadsheetId: id,
      range: "Database"
    })
    .then(function(response) {
      var data = getJsonArrayFromData(response.result.values);
      callback(data);
    });
}
