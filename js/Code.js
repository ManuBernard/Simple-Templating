// On document init add button to menu
function onOpen() {
  var ui = SpreadsheetApp.getUi();

  ui.createMenu("Simple Templating")
    .addItem("Open Sidebar", "showSidebar")
    .addToUi();
}

// Show sidebar
function showSidebar() {
  var sidebar_html = HtmlService.createTemplateFromFile("views/sidebar/page")
    .evaluate()
    .setTitle(DICTIONNARY("SIDEBAR_TITLE"));

  SpreadsheetApp.getUi().showSidebar(sidebar_html);
}

// Include function for templating
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
