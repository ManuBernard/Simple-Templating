// Show file picker
function showPicker() {
  var properties = PropertiesService.getScriptProperties();

  var html = HtmlService.createHtmlOutputFromFile("views/Picker.html")
    .setWidth(600)
    .setHeight(425)
    .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  SpreadsheetApp.getUi().showModalDialog(
    html,
    "Select " + properties.getProperty("picker_mode")
  );
}

// Call pack on picker is picked, save the file in cache for reuse in checkPickerUpdate
function onPickerPicked(file) {
  var properties = PropertiesService.getScriptProperties();

  if (properties.getProperty("picker_mode") == "template") {
    properties.setProperty("template", file);
  } else if (properties.getProperty("picker_mode") == "folder") {
    properties.setProperty("folder", file);
  }

  properties.setProperty("picker_mode", "done");
}

// Call pack on picker is picked, save the file in cache for reuse in checkPickerUpdate
function onPickerClosed() {
  var properties = PropertiesService.getScriptProperties();
  properties.setProperty("picker_mode", "done");
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

// Called from page, check if the picker has something to return
function getData() {
  var properties = PropertiesService.getScriptProperties();

  var template = properties.getProperty("template");
  var folder = properties.getProperty("folder");
  var name = properties.getProperty("name");

  var data = {
    template: template,
    folder: folder,
    name: name
  };

  return data;
}

// Return token (for filepicker)
function getOAuthToken() {
  var properties = PropertiesService.getScriptProperties();

  var token = ScriptApp.getOAuthToken();
  var mode = properties.getProperty("picker_mode");
  DriveApp.getRootFolder();
  var payLoad = {
    token: token,
    mode: mode
  };
  return payLoad;
}
