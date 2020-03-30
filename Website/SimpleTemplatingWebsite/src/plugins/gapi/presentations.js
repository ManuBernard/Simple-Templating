import { duplicateFile } from "./drive";
import { readDatabase } from "./spreadsheets";

let project = null;
let callback = null;
let newfile = null;
let sheetdata = null;
let properties = [];

export function templetify(p, count, c) {
  project = p;
  callback = c;

  duplicateFile(
    {
      fileId: project.template.id,
      name: project.name + " #" + count,
      parent: project.folder.id
    },
    function(data) {
      newfile = data;

      callback(data);
      getData();
    }
  );
}

function getData() {
  readDatabase(project.database.id, createSlides);
}

function createSlides(data) {
  sheetdata = data;

  for (var name in sheetdata[0]) {
    properties.push(name);
  }

  window.gapi.client.slides.presentations
    .get({
      presentationId: newfile.id
    })
    .then(function(response) {
      var requests = [];

      // duplicate templates for each lines
      sheetdata.forEach(line => {
        requests.push({
          duplicateObject: {
            objectId: response.result.slides[0].objectId
          }
        });
      });

      // Remove templates to let just new content
      for (var i = 0; i < response.result.slides.length; i++) {
        requests.push({
          deleteObject: {
            objectId: response.result.slides[i].objectId
          }
        });
      }

      window.gapi.client.slides.presentations
        .batchUpdate({
          presentationId: newfile.id,
          requests: requests
        })
        .then(createSlideResponse => {
          replaceContent();
        });
    });
}

function replaceContent() {
  window.gapi.client.slides.presentations
    .get({
      presentationId: newfile.id
    })

    .then(function(response) {
      var requests = [];
      response.result.slides.forEach((slide, index) => {
        const line = sheetdata[index];

        requests = replaceText(slide, line, requests);
        requests = replaceColors(slide, line, requests);
      });

      window.gapi.client.slides.presentations
        .batchUpdate({
          presentationId: newfile.id,
          requests: requests
        })
        .then(createSlideResponse => {});
    });
}

function replaceText(slide, line, requests) {
  for (let [key, value] of Object.entries(line)) {
    requests.push({
      replaceAllText: {
        replaceText: value,
        pageObjectIds: [slide.objectId],
        containsText: {
          text: "{{" + key + "}}",
          matchCase: false
        }
      }
    });
  }
  return requests;
}

function replaceColors(slide, line, requests) {
  slide.pageElements.forEach(element => {
    console.log(element);
    if (element.description) {
      var commands = parseDescription(element.description);

      commands.forEach(command => {
        if (line[command.value]) {
          if (element.shape) {
            if (command.key == "background-color") {
              var color = parseColor(line[command.value]);
              if (color) {
                requests.push(backgroundColor(element, color));
              }
            }

            if (command.key == "border-color") {
              var color = parseColor(line[command.value]);
              if (color) {
                requests.push(borderColor(element, color));
              }
            }

            if (command.key == "text-color") {
              var color = parseColor(line[command.value]);
              if (color) {
                requests.push(textColor(element, color));
              }
            }
          }
          if (element.line) {
            if (command.key == "line-color") {
              var color = parseColor(line[command.value]);
              if (color) {
                requests.push(lineColor(element, color));
              }
            }
          }
        }
      });
    }
    if (element.shape && element.description) {
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
          solidFill: color
        }
      }
    }
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
            solidFill: color
          }
        }
      }
    }
  };
}

function lineColor(element, color) {
  console.log(color);
  return {
    updateLineProperties: {
      objectId: element.objectId,
      fields: "lineFill.solidFill.color",
      lineProperties: {
        lineFill: {
          solidFill: color
        }
      }
    }
  };
}

function textColor(element, color) {
  return {
    updateTextStyle: {
      objectId: element.objectId,
      fields: "foregroundColor.opaqueColor.rgbColor",
      style: {
        foregroundColor: {
          opaqueColor: {
            rgbColor: color.color.rgbColor
          }
        }
      }
    }
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
        value: instructionSplitted[1].trim().replace(" ", "")
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
      green: color.split(",")[2]
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
          green: validateColor.green / 256
        }
      },
      alpha: parseFloat(1)
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
        blue: parseInt(result[3], 16)
      }
    : null;
}
