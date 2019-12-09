function getConfig() {
  var data = {
    files: getFiles(),
    isPro: isProKey()
  };

  return data;
}

// Called from page, check if the picker has something to return
function getFiles() {
  var properties = PropertiesService.getScriptProperties();

  var picker_mode = properties.getProperty("picker_mode");
  var data = null;

  if (picker_mode == "done") {
    var template = properties.getProperty("template");
    var folder = properties.getProperty("folder");

    data = {
      template: template,
      folder: folder
    };
  }

  return data;
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

// Generate new file
function generate(name) {
  var properties = PropertiesService.getScriptProperties();

  // Get data from storage
  var templateId = JSON.parse(properties.getProperty("template")).id;
  var folderId = JSON.parse(properties.getProperty("folder")).id;
  var dataBaseId = SpreadsheetApp.getActive().getId();

  // If no name provided, use default one
  name = name ? name : DICTIONNARY("DEFAULT_EXPORTED_FILENAME");

  // Get list of lines from sheet
  var lines = linesGet(dataBaseId);

  // Create new Slide file from template and place it in output folder
  var presentation = presentationCreate(templateId, name, folderId);

  // Create cards in presentation
  cardsCreate(lines, presentation.id);

  return presentation.id;
}

function submitProKey(key) {
  var properties = PropertiesService.getScriptProperties();
  properties.setProperty(CONFIG("PROPERTY_PROKEY"), key);

  return isProKey();
}

function removeProKey() {
  var properties = PropertiesService.getScriptProperties();
  properties.deleteProperty(CONFIG("PROPERTY_PROKEY"));

  return false;
}

function isProKey() {
  var properties = PropertiesService.getScriptProperties();
  var key = properties.getProperty(CONFIG("PROPERTY_PROKEY"));

  var isPro = false;

  if (key == "pompom") {
    isPro = true;
  }

  return isPro;

  // var query = '"Apps Script" stars:">=100"';
  // var url =
  //   "https://api.github.com/search/repositories" +
  //   "?sort=stars" +
  //   "&q=" +
  //   encodeURIComponent(query);

  // var response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  // Logger.log(response);
}
