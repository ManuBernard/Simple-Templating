// On document init add button to menu
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  // Or DocumentApp or FormApp.
  ui.createMenu("Simple Templating")
    .addItem("Open Sidebar", "showSidebar")
    .addToUi();
}

// On click on the start button, from menu, show sidebar
function showSidebar() {
  sidebar_html = HtmlService.createHtmlOutputFromFile("Page")
    .setTitle("Simple Templating")
    .setWidth(300);
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
    .showSidebar(sidebar_html);
}

// Save the output file name
function saveName(name) {
  CacheService.getDocumentCache().put("name", name, 1500000000);
}

// Generate the cards (called from the sidebar)
function generate() {
  var templateId = JSON.parse(CacheService.getDocumentCache().get("template"))
    .id;
  var folderId = JSON.parse(CacheService.getDocumentCache().get("folder")).id;
  var dataBaseId = SpreadsheetApp.getActive().getId();
  var name = CacheService.getDocumentCache().get("name");

  return generate_cards(templateId, folderId, dataBaseId, name);
}
