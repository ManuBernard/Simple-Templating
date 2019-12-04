// Generate the cards (called from the sidebar)
function generate() {
  var templateId = JSON.parse(CacheService.getDocumentCache().get("template"))
    .id;
  var folderId = JSON.parse(CacheService.getDocumentCache().get("folder")).id;
  var dataBaseId = SpreadsheetApp.getActive().getId();
  var name = CacheService.getDocumentCache().get("name");

  return generate_cards(templateId, folderId, dataBaseId, name);
}
