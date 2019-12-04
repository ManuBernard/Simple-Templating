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
  sidebar_html = HtmlService.createHtmlOutputFromFile("views/Sidebar")
    .setTitle("Simple Templating")
    .setWidth(300);
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
    .showSidebar(sidebar_html);
}

// Save the output file name
function saveName(name) {
  var properties = PropertiesService.getScriptProperties();
  properties.setProperty("name");
}

// Generate the cards (called from the sidebar)
function generate() {
  var properties = PropertiesService.getScriptProperties();

  var templateId = JSON.parse(properties.getProperty("template")).id;
  var folderId = JSON.parse(properties.getProperty("folder")).id;
  var name = properties.getProperty("name");

  var dataBaseId = SpreadsheetApp.getActive().getId();

  return generate_cards(templateId, folderId, dataBaseId, name);
}
