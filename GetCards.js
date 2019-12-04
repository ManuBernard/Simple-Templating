function getCards(dataBaseId) {
  var ss = SpreadsheetApp.openById(dataBaseId);
  var activeRange = ss.getDataRange().getDisplayValues();

  var cards = getJsonArrayFromData(activeRange);

  return cards;
}
