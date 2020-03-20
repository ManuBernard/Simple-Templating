// Manually generate the cards
function manuallyGenerate() {
  var templateId = "1AkFlTf8JbYxVtDHV0IiGVbNO3ilG8rvxHN8OfCDaPHY";
  var folderId = "1-VHwTYUu6tbKL0pT71L-ZMvjjMyxW7Ff";
  var dataBaseId = "11slZxhLb77nLJVxc-V4ijEUrfuWvNidXrUhhPAdVch4";
  var name = "Manually generated 2";

  // Get list of lines from sheet
  var lines = linesGet(dataBaseId);

  // Create new Slide file from template and place it in output folder
  var presentation = presentationCreate(templateId, name, folderId);

  // Create cards in presentation
  cardsCreate(lines, presentation.id);

  return presentation.id;
}
