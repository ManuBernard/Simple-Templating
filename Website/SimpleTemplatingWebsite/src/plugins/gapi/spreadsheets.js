export function readDatabase(id, callback) {
  window.gapi.client.sheets.spreadsheets
    .get({ spreadsheetId: id })
    .then(function(sheetsresponse) {
      let range = sheetsresponse.result.sheets[0].properties.title;
      sheetsresponse.result.sheets.forEach((sheet) => {
        if (sheet.properties.title.toLowerCase().trim() == "database") {
          range = sheet.properties.title;
        }
      });
      getDatabase(id, range, function(data) {
        callback(getJsonArrayFromData(data.result.values));
      });
    });
}

export function getDatabase(id, range, callback) {
  let payload = {
    spreadsheetId: id,
    range: range,
  };

  window.gapi.client.sheets.spreadsheets.values
    .get(payload)
    .then(function(response) {
      callback(response);
    });
}

function getJsonArrayFromData(data) {
  var obj = {};
  var result = [];
  var headers = data[0];
  var cols = headers.length;
  var row = [];

  for (var i = 1, l = data.length; i < l; i++) {
    row = data[i];

    obj = {};
    for (var col = 0; col < cols; col++) {
      if (headers[col].substring(0, 1) == "#") {
        headers[col] = headers[col].toUpperCase();
      }
      obj[headers[col]] = row[col];
    }

    result.push(obj);
  }

  return result;
}
