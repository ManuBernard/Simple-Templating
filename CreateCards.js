function createCards(cards, presentationId) {
  var presentation = SlidesApp.openById(presentationId);
  var slides = presentation.getSlides();
  var templateSlidesCount = slides.length;
  var properties = [];

  var i = templateSlidesCount;
  for (var propertyName in cards[0]) {
    properties.push(propertyName);
  }

  // Generate cards
  cards.forEach(function(card) {
    var cardTemplateRecto = card.template ? card.template - 1 : 0;

    var ns_recto = slides[cardTemplateRecto].duplicate();
    ns_recto.move(presentation.getSlides().length);
    i++;

    // if (mode == "bothsides") {
    //   var cardTemplateVerso = card.templateback ? card.templateback - 1 : 1;

    //   var ns_verso = slides[cardTemplateVerso].duplicate();
    //   ns_verso.move(presentation.getSlides().length);
    //   i++;
    // }

    // Replace texts
    properties.forEach(function(property) {
      if (property) {
        try {
          ns_recto.replaceAllText("{{" + property + "}}", card[property]);
        } catch (error) {
          console.error(error);
        }

        // if (mode == "bothsides") {
        //   try {
        //     ns_verso.replaceAllText("{{" + property + "}}", card[property]);
        //   } catch (error) {
        //     console.error(error);
        //   }
        // }
      }
    });

    // Replace colors and images
    var recto_elements = ns_recto.getPageElements();
    parseImageAndColors(recto_elements, card);

    // if (mode == "bothsides") {
    //   var verso_elements = ns_verso.getPageElements();
    //   parseImageAndColors(verso_elements, card);
    // }
  });

  // Remove template slides
  for (var i = 0; i < templateSlidesCount; i++) {
    slides[i].remove();
  }
}
