function cardsCreate(lines, presentationId) {
  var presentation = SlidesApp.openById(presentationId);
  var models = presentation.getSlides();
  var modelsCount = models.length;
  var properties = [];

  // Construct list of property from line 1
  for (var name in lines[0]) {
    properties.push(name);
  }

  // Generate cards
  lines.forEach(function(line) {
    var modelIDs = [];

    if (line.st_model) {
      modelIDs = line.st_model.split(",");
    } else {
      modelIDs.push(1);
    }

    modelIDs.forEach(function(modelId) {
      // Remove 1 to template, so user ask for 1 and get 0. More friendly.
      modelId = parseInt(modelId) - 1;

      // Create card from model
      var card = models[modelId].duplicate();
      card.move(presentation.getSlides().length);

      // Transform a model in a card passing dynamic data
      modelToCard(card, line, properties);
    });
  });

  // Remove template slides
  for (var i = 0; i < modelsCount; i++) {
    models[i].remove();
  }
}
