function read() {
  var dataBaseId = '1Gd5KUoSqw9sRCEKhkafZl0akeyf0jpM_vxV_KHhGmHw';
  var ss = SpreadsheetApp.openById(dataBaseId);
  var activeRange = ss.getDataRange().getDisplayValues();
  var cards = getJsonArrayFromData(activeRange);
  
    var properties = [];
  
   console.log('NEWWW');
   
  for (var propertyName in cards[0]) {
    console.log(cards[0][propertyName]);
    
    properties.push(propertyName);
  }
}
