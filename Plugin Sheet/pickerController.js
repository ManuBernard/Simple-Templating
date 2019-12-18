// Show file picker
function showPicker() {
  var properties = PropertiesService.getScriptProperties();

  var html = HtmlService.createTemplateFromFile("views/picker/page.html")
    .evaluate()
    .setWidth(600)
    .setHeight(425)
    .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  SpreadsheetApp.getUi().showModalDialog(
    html,
    "Select " + properties.getProperty("picker_mode")
  );
}

// Callback on picker is picked, save the file in cache for reuse in checkPickerUpdate
function onPickerPicked(file) {
  var properties = PropertiesService.getScriptProperties();

  if (properties.getProperty("picker_mode") == "template") {
    properties.setProperty("template", file);
  } else if (properties.getProperty("picker_mode") == "folder") {
    properties.setProperty("folder", file);
  }

  properties.setProperty("picker_mode", "done");
}

// Callback on picker is closed
function onPickerClosed() {
  var properties = PropertiesService.getScriptProperties();
  properties.setProperty("picker_mode", "done");
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
