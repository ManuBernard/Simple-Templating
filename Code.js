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
  var mode = CacheService.getDocumentCache().get("mode");

  generate_cards(templateId, folderId, dataBaseId, name, mode);
}

function generate_cards(templateId, folderId, dataBaseId, name, mode) {
  // 1 : récupération de la liste des cartes dans la sheet
  var cards = getCards(dataBaseId);

  // 2 : on créé le fichier à partir du template souhaité, avec le nom paramétré
  var presentation = createPresentation(templateId, name, folderId);

  // 3 : on construit la liste des cartes
  createCards(cards, presentation.id, mode);

  return presentation.id;
}
