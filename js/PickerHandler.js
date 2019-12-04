// Called from page : open the picker in "template" mode
function selectTemplate() {
  CacheService.getDocumentCache().put("picker_mode", "template", 1500000000);
  showPicker();
}

// Called from page : open the picker in "folder" mode
function selectFolder() {
  CacheService.getDocumentCache().put("picker_mode", "folder", 1500000000);
  showPicker();
}

// Show file picker
function showPicker() {
  var html = HtmlService.createHtmlOutputFromFile("views/Picker.html")
    .setWidth(600)
    .setHeight(425)
    .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  SpreadsheetApp.getUi().showModalDialog(
    html,
    "Select " + CacheService.getDocumentCache().get("picker_mode")
  );
}

// Call pack on picker is picked, save the file in cache for reuse in checkPickerUpdate
function onPickerPicked(file) {
  if (CacheService.getDocumentCache().get("picker_mode") == "template") {
    CacheService.getDocumentCache().put("template", file, 1500000000);
  } else if (CacheService.getDocumentCache().get("picker_mode") == "folder") {
    CacheService.getDocumentCache().put("folder", file, 1500000000);
  }

  CacheService.getDocumentCache().put("picker_mode", "done", 1500000000);
}

// Call pack on picker is picked, save the file in cache for reuse in checkPickerUpdate
function onPickerClosed() {
  // CacheService.getDocumentCache().remove("picker_mode");
}

// Called from page, check if the picker has something to return
function getFiles() {
  var picker_mode = CacheService.getDocumentCache().get("picker_mode");
  var data = null;

  if (picker_mode == "done") {
    var template = CacheService.getDocumentCache().get("template");
    var folder = CacheService.getDocumentCache().get("folder");

    data = {
      template: template,
      folder: folder
    };
  }

  return data;
}

// Called from page, check if the picker has something to return
function getData() {
  var template = CacheService.getDocumentCache().get("template");
  var folder = CacheService.getDocumentCache().get("folder");
  var name = CacheService.getDocumentCache().get("name");
  var mode = CacheService.getDocumentCache().get("mode");

  var data = {
    template: template,
    folder: folder,
    name: name,
    mode: mode
  };

  return data;
}

// Return token (for filepicker)
function getOAuthToken() {
  var token = ScriptApp.getOAuthToken();
  DriveApp.getRootFolder();
  var payLoad = {
    token: token,
    mode: CacheService.getDocumentCache().get("picker_mode")
  };
  return payLoad;
}
