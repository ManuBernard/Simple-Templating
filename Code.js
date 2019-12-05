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

// Called from page : open the picker in "template" mode
function selectTemplate() {
  var properties = PropertiesService.getScriptProperties();
  properties.setProperty("picker_mode", "template");
  showPicker();
}

// Remove the template
function removeTemplate() {
  var properties = PropertiesService.getScriptProperties();
  properties.deleteProperty("template");
}

// Called from page : open the picker in "folder" mode
function selectFolder() {
  var properties = PropertiesService.getScriptProperties();
  properties.setProperty("picker_mode", "folder");
  showPicker();
}

// Remove the folder
function removeFolder() {
  var properties = PropertiesService.getScriptProperties();
  properties.deleteProperty("folder");
}

// Generate the cards (called from the sidebar)
function generate(name) {
  var properties = PropertiesService.getScriptProperties();

  var templateId = JSON.parse(properties.getProperty("template")).id;
  var folderId = JSON.parse(properties.getProperty("folder")).id;

  name = name ? name : DICTIONNARY("DEFAULT_EXPORTED_FILENAME");

  var dataBaseId = SpreadsheetApp.getActive().getId();

  return generate_cards(templateId, folderId, dataBaseId, name);
}
