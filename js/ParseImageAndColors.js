function parseImageAndColors(elements, card) {
elements.forEach(function(element) {
    // Remplace les images
    var type = element.getPageElementType();
    if (type == "IMAGE") {
    var link = element.asImage().getTitle();
    if (link) {
        element
        .asImage()
        .replace("https://docs.google.com/uc?id=" + card[link]);
    }
    }

    // Remplace les couleurs
    var type = element.getPageElementType();
  if (type == "LINE") {
        // Remplace les couleurs de BG
        var bg = element
            .asLine()
            .getLineFill()
            .getSolidFill();
        if (bg) {
            var color = bg
            .getColor()
            .asRgbColor()
            .asHexString();
            if (card[color.toUpperCase()]) {
            element
                .asLine()
                .getLineFill()
                .setSolidFill(card[color].toUpperCase());
            }
        }
  }
    if (type == "SHAPE" ) {
        // Remplace les couleurs de BG
        var bg = element
            .asShape()
            .getFill()
            .getSolidFill();
        if (bg) {
            var color = bg
            .getColor()
            .asRgbColor()
            .asHexString();
            if (card[color.toUpperCase()]) {
            element
                .asShape()
                .getFill()
                .setSolidFill(card[color].toUpperCase());
            }
        }

        // Remplace les couleurs de bordures
        var bg_border = element
            .asShape()
            .getBorder()
            .getLineFill();
        if (bg_border) {
            if (bg_border.getFillType() == "SOLID") {
            var bg_border_color = bg_border
                .getSolidFill()
                .getColor()
                .asRgbColor()
                .asHexString();

            if (card[bg_border_color.toUpperCase()]) {
                element
                .asShape()
                .getBorder()
                .getLineFill()
                .setSolidFill(card[bg_border_color].toUpperCase());
            }
            }
        }

        // Remplace les couleurs de textes
        if (
            element
            .asShape()
            .getText()
            .getTextStyle()
            .getForegroundColor()
        ) {
            
            try{
                var text_color = element
                .asShape()
                .getText()
                .getTextStyle()
                .getForegroundColor()
                .asRgbColor()
                .asHexString();

                if (
                text_color &&
                element
                    .asShape()
                    .getText()
                    .getTextStyle()
                ) {
                if (card[text_color.toUpperCase()]) {
                    Logger.log(
                    element
                        .asShape()
                        .getText()
                        .getLength()
                    );
                    element
                    .asShape()
                    .getText()
                    .getTextStyle()
                    .setForegroundColor(card[text_color].toUpperCase());
                }
                }
            }
            
            catch(error){
                console.log(error); 
            }
        }

        // Text background
        if (
            element
            .asShape()
            .getText()
            .getTextStyle()
            .getBackgroundColor()
        ) {
            
            try{
                var text_color = element
                .asShape()
                .getText()
                .getTextStyle()
                .getBackgroundColor()
                .asRgbColor()
                .asHexString();

                if (
                text_color &&
                element
                    .asShape()
                    .getText()
                    .getTextStyle()
                ) {
                if (card[text_color.toUpperCase()]) {
                    Logger.log(
                    element
                        .asShape()
                        .getText()
                        .getLength()
                    );
                    element
                    .asShape()
                    .getText()
                    .getTextStyle()
                    .setBackgroundColor(card[text_color].toUpperCase());
                }
                }
            }
            
            catch(error){
                console.log(error); 
            }
        }
    }
});
}
