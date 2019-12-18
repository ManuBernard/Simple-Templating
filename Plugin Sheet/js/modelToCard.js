function modelToCard(card, row, properties) {
  // Replace texts
  properties.forEach(function(property) {
    try {
      card.replaceAllText("{{" + property + "}}", row[property]);
    } catch (error) {
      console.error(error);
    }
  });

  // Get all elements from card
  var elements = card.getPageElements();

  // If promode is activated, allow dynamic colors and images replacement
  if (isPro()) {
    elements.forEach(function(element) {
      var type = element.getPageElementType();

      // Replace images
      if (type == "IMAGE") {
        replaceImage(element.asImage(), row);
      }

      if (type == "LINE") {
        // Replace line color
        var fill_line = element.asLine().getLineFill();
        replaceFillColor(fill_line, row);
      }

      if (type == "SHAPE") {
        // Replace shape background color
        var fill_bg = element.asShape().getFill();
        replaceFillColor(fill_bg, row);

        // Replace shape border color
        var fill_border = element
          .asShape()
          .getBorder()
          .getLineFill();
        replaceFillColor(fill_border, row);

        // Replace text colors
        var text = element
          .asShape()
          .getText()
          .getTextStyle();
        replaceTextColor(text, row);
      }
    });
  }
}

function replaceFillColor(fill, row) {
  try {
    var color = fill
      .getSolidFill()
      .getColor()
      .asRgbColor()
      .asHexString();

    if (row[color.toUpperCase()]) {
      fill.setSolidFill(row[color].toUpperCase());
    }
  } catch (error) {
    console.log("error");
  }
}

function replaceTextColor(textStyle, row) {
  // Text color
  try {
    var text_color = textStyle
      .getForegroundColor()
      .asRgbColor()
      .asHexString();

    if (row[text_color.toUpperCase()]) {
      textStyle.setForegroundColor(row[text_color].toUpperCase());
    }
  } catch (error) {
    console.log(error);
  }

  // Text background
  try {
    var text_color = textStyle
      .getBackgroundColor()
      .asRgbColor()
      .asHexString();
    if (row[text_color.toUpperCase()]) {
      textStyle.setBackgroundColor(row[text_color].toUpperCase());
    }
  } catch (error) {
    console.log(error);
  }
}

function replaceImage(image, row) {
  try {
    var imageCode = image.getTitle();
    if (imageCode) {
      console.log(imageCode);
      if (row[imageCode]) {
        console.log(row[imageCode]);

        if (row[imageCode].indexOf("drive.google.com") > -1) {
          console.log("is drive");
          var id = row[imageCode].split("?id=")[1];
          console.log(id);
          image.replace("https://docs.google.com/uc?id=" + id);
        } else {
          console.log("is not drive");
          image.replace(row[imageCode]);
        }
      } else {
        image.remove();
      }
    }
  } catch (error) {
    console.log(error);
  }
}
