function linesGet(dataBaseId) {
  var ss = SpreadsheetApp.openById(dataBaseId);
  var activeRange = ss.getDataRange().getDisplayValues();

  var lines = getJsonArrayFromData(activeRange);

  return lines;
}
