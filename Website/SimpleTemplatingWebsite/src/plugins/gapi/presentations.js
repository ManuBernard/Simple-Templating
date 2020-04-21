import { duplicateFile } from "./drive";
import { readDatabase } from "./spreadsheets";

let project = null;
let callback = null;
let newfile = null;
let sheetdata = null;

export function templetify(p, count, c) {
  project = p;
  callback = c;

  duplicateFile(
    {
      fileId: project.template.id,
      name: project.name + " #" + count,
      parent: project.folder.id,
    },
    function(data) {
      newfile = data;
      readDatabase(project.database.id, createSlides);
    }
  );
}

function createSlides(data) {
  sheetdata = data;

  window.gapi.client.slides.presentations
    .get({
      presentationId: newfile.id,
    })
    .then(function(response) {
      var requests = [];

      var countindex = 1;

      // duplicate templates for each lines
      sheetdata.forEach((line, linecount) => {
        var modelIDs = [];

        if (line.st_model) {
          modelIDs = line.st_model.split(",");
        } else {
          modelIDs.push(1);
        }

        modelIDs.forEach(function(modelId) {
          modelId = parseInt(modelId) - 1;
          var dpr = {
            duplicateObject: {
              objectId: response.result.slides[modelId].objectId,
              objectIds: {},
            },
          };

          dpr.duplicateObject.objectIds[
            response.result.slides[modelId].objectId
          ] = "slide_" + countindex + "_line_" + linecount;

          requests.push(dpr);

          requests.push({
            updateSlidesPosition: {
              slideObjectIds: ["slide_" + countindex + "_line_" + linecount],
              insertionIndex: countindex + response.result.slides.length,
            },
          });

          countindex++;
        });
      });

      // Remove templates to let just new content
      for (var i = 0; i < response.result.slides.length; i++) {
        requests.push({
          deleteObject: {
            objectId: response.result.slides[i].objectId,
          },
        });
      }

      window.gapi.client.slides.presentations
        .batchUpdate({
          presentationId: newfile.id,
          requests: requests,
        })
        .then((createSlideResponse) => {
          replaceContent();
        });
    });
}

function replaceContent() {
  window.gapi.client.slides.presentations
    .get({
      presentationId: newfile.id,
    })

    .then(function(response) {
      var requests = [];
      response.result.slides.forEach((slide, index) => {
        var lineIndex = parseInt(slide.objectId.split("_line_")[1]);
        slide.line = sheetdata[lineIndex];

        requests = replaceText(slide, requests);
        requests = replaceColors(slide, requests);
        requests = replaceImages(slide, requests);
      });

      window.gapi.client.slides.presentations
        .batchUpdate({
          presentationId: newfile.id,
          requests: requests,
        })
        .then((createSlideResponse) => {
          callback(newfile);
        });
    });
}

function replaceText(slide, requests) {
  var hastext = false;
  slide.pageElements.forEach((element) => {
    if (element.shape && element.shape.text) hastext = true;
  });

  if (hastext) {
    for (let [key, value] of Object.entries(slide.line)) {
      requests.push({
        replaceAllText: {
          replaceText: value,
          pageObjectIds: [slide.objectId],
          containsText: {
            text: "{{" + key + "}}",
            matchCase: false,
          },
        },
      });
    }
  }
  return requests;
}

function replaceColors(slide, requests) {
  slide.pageElements.forEach((element) => {
    if (element.description) {
      var commands = parseDescription(element.description);
      commands.forEach((command) => {
        if (slide.line[command.value]) {
          var color = parseColor(slide.line[command.value]);
          if (slide.line[command.value] && color) {
            if (command.key == "background-color" && element.shape) {
              requests.push(backgroundColor(element, color));
            }

            if (command.key == "border-color" && element.shape) {
              requests.push(borderColor(element, color));
            }

            if (command.key == "text-color" && element.shape) {
              requests.push(textColor(element, color));
            }

            if (command.key == "line-color" && element.line) {
              requests.push(lineColor(element, color));
            }
          }
        }
      });
    }
  });

  return requests;
}

function replaceImages(slide, requests) {
  slide.pageElements.forEach((element) => {
    if (element.description) {
      var commands = parseDescription(element.description);
      commands.forEach((command) => {
        if (slide.line[command.value]) {
          if (command.key == "image" && element.image) {
            var imageRequest = replaceImage(element, slide.line[command.value]);
            if (imageRequest) {
              requests.push(imageRequest);
            }
          }
        }
      });
    }
  });

  return requests;
}

function backgroundColor(element, color) {
  return {
    updateShapeProperties: {
      objectId: element.objectId,
      fields:
        "shapeBackgroundFill.solidFill.color, shapeBackgroundFill.solidFill.alpha",
      shapeProperties: {
        shapeBackgroundFill: {
          solidFill: color,
        },
      },
    },
  };
}

function borderColor(element, color) {
  return {
    updateShapeProperties: {
      objectId: element.objectId,
      fields:
        "outline.outlineFill.solidFill.color, outline.outlineFill.solidFill.alpha",
      shapeProperties: {
        outline: {
          outlineFill: {
            solidFill: color,
          },
        },
      },
    },
  };
}

function lineColor(element, color) {
  return {
    updateLineProperties: {
      objectId: element.objectId,
      fields: "lineFill.solidFill.color",
      lineProperties: {
        lineFill: {
          solidFill: color,
        },
      },
    },
  };
}

function replaceImage(element, image) {
  if (image.indexOf("drive.google.com") > -1) {
    var id = image.split("?id=")[1];
    image = "https://docs.google.com/uc?id=" + id;
  }
  if (image.startsWith("http")) {
    return {
      replaceImage: {
        imageObjectId: element.objectId,
        url: image,
      },
    };
  } else {
    return {
      deleteObject: {
        objectId: element.objectId,
      },
    };
  }
}

function textColor(element, color) {
  return {
    updateTextStyle: {
      objectId: element.objectId,
      fields: "foregroundColor.opaqueColor.rgbColor",
      style: {
        foregroundColor: {
          opaqueColor: {
            rgbColor: color.color.rgbColor,
          },
        },
      },
    },
  };
}

function parseDescription(description) {
  let commands = [];
  var instructions = description.split(";");
  instructions.forEach(function(instruction) {
    var instructionSplitted = instruction.split(":");
    if (instructionSplitted[0] && instructionSplitted[1]) {
      var commandline = {
        key: instructionSplitted[0].trim().replace(" ", ""),
        value: instructionSplitted[1].trim().replace(" ", ""),
      };
      commands.push(commandline);
    }
  });
  return commands;
}

function parseColor(color) {
  var validateColor = false;
  var alpha = 1;
  if (color.startsWith("#")) {
    validateColor = hexToRgb(color);
  } else if (color.split(",").length >= 3) {
    validateColor = {
      red: color.split(",")[0],
      blue: color.split(",")[1],
      green: color.split(",")[2],
    };

    if (color.split(",").length == 4) {
      alpha = color.split(",")[3];
    }
  }

  if (validateColor) {
    return {
      color: {
        rgbColor: {
          red: validateColor.red / 256,
          blue: validateColor.blue / 256,
          green: validateColor.green / 256,
        },
      },
      alpha: parseFloat(alpha),
    };
  } else {
    return false;
  }
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        red: parseInt(result[1], 16),
        green: parseInt(result[2], 16),
        blue: parseInt(result[3], 16),
      }
    : null;
}
