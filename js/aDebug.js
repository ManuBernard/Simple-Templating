// Manually generate the cards
function manuallyGenerate() {
  var templateId = "19q7BnfLZQ4X7d5y6WET7_BT1zlP_j4AF56zBebfaq58";
  var folderId = "1-VHwTYUu6tbKL0pT71L-ZMvjjMyxW7Ff";
  var dataBaseId = "1Gd5KUoSqw9sRCEKhkafZl0akeyf0jpM_vxV_KHhGmHw";
  var name = "Manually generated 2";

  // Get list of lines from sheet
  var lines = linesGet(dataBaseId);

  // Create new Slide file from template and place it in output folder
  var presentation = presentationCreate(templateId, name, folderId);

  // Create cards in presentation
  cardsCreate(lines, presentation.id);

  return presentation.id;
}
