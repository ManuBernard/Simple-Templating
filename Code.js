// On document init add button to menu
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  // Or DocumentApp or FormApp.
  ui.createMenu('Simple Templating')
      .addItem('Open Sidebar', 'showSidebar')
      .addToUi();
}

// On click on the start button, from menu, show sidebar
function showSidebar() {
  sidebar_html = HtmlService.createHtmlOutputFromFile('Page')
      .setTitle('Simple Templating')
      .setWidth(300);
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
      .showSidebar(sidebar_html);
}

// Called from page : open the picker in "template" mode
function selectTemplate(){
  CacheService.getDocumentCache().put("picker_mode", "template", 1500000000);
  showPicker();
}

// Called from page : open the picker in "folder" mode
function selectFolder(){
  CacheService.getDocumentCache().put("picker_mode", "folder", 1500000000);
  showPicker();
}

function saveName(name){
  CacheService.getDocumentCache().put("name", name, 1500000000);
}
                                    
function saveMode(modeCode){
  CacheService.getDocumentCache().put("mode", modeCode, 1500000000);
}

// Show file picker
function showPicker() {
  var html = HtmlService.createHtmlOutputFromFile('Picker.html')
      .setWidth(600)
      .setHeight(425)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
   SpreadsheetApp.getUi().showModalDialog(html, 'Select ' + CacheService.getDocumentCache().get("picker_mode"));
}

// Call pack on picker is picked, save the file in cache for reuse in checkPickerUpdate
function onPickerPicked(file){
  if(CacheService.getDocumentCache().get("picker_mode") == 'template'){
     CacheService.getDocumentCache().put("template", file, 1500000000);
  } else  if(CacheService.getDocumentCache().get("picker_mode") == 'folder'){
     CacheService.getDocumentCache().put("folder", file, 1500000000);
  }
  
   // CacheService.getDocumentCache().remove("picker_mode");
}

// Called from page, check if the picker has something to return
function getFiles(){
  var template = CacheService.getDocumentCache().get("template");
  var folder = CacheService.getDocumentCache().get("folder");
  
  var data = {
      template:  template,
      folder : folder
    };
    
    return data;
}

// Called from page, check if the picker has something to return
function getData(){
  var template = CacheService.getDocumentCache().get("template");
  var folder = CacheService.getDocumentCache().get("folder");    
  var name = CacheService.getDocumentCache().get("name");
  var mode = CacheService.getDocumentCache().get("mode"); 
  
  var data = {
      template:  template,
      folder : folder,
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
    token : token,
    mode: CacheService.getDocumentCache().get("picker_mode")
  };
  return payLoad;
}

function generate() {
  var templateId = JSON.parse(CacheService.getDocumentCache().get("template")).id; 
  var folderId =  JSON.parse(CacheService.getDocumentCache().get("folder")).id;
  var dataBaseId = SpreadsheetApp.getActive().getId();
  var name = CacheService.getDocumentCache().get("name");
  var mode = CacheService.getDocumentCache().get("mode");
  
  generate_cards(templateId, folderId, dataBaseId, name, mode);
}



function generate_cards(templateId, folderId, dataBaseId, name, mode) {
  
  /* Déroulement */
  
  // 1 : récupération de la liste des cartes dans la sheet
 var cards = getCards(dataBaseId);


  // 2 : on créé le fichier à partir du template souhaité, avec le nom paramétré
 var presentation = createPresentation(templateId, name, folderId);
  
  // 3 : on construit la liste des cartes
  createCards(cards, presentation.id, mode);
  
  // var presentation = SlidesApp.openById(presentationId);

  return presentation.id;
}

