/* Initialize a new database from the projecttemplate database */

let finish_cb;
let error_cb = function(error) {
  console.log(error.result.error.message);
};
let payload;

/* 1 initialize : copy the sheet "database" from projecttemplate database to freshly created database */
export function initTemplate(pl, callback) {
  // DEV REQUEST TO RETRIEVE OBJECTS
  var r = window.gapi.client.slides.presentations.get({
    presentationId: pl.source_template,
  });

  r.then(function(data) {
    console.log(data);
  });

  payload = pl;
  var request = window.gapi.client.slides.presentations.get({
    presentationId: payload.destination_template,
  });

  request.then(function(data) {
    cleanObjects(data);
    createShape(data);
  });
}

function cleanObjects(data) {
  console.log(data);
  var requestPayload = {
    presentationId: payload.destination_template,
    requests: [],
  };

  data.result.slides[0].pageElements.forEach((element) => {
    requestPayload.requests.push({
      deleteObject: {
        objectId: element.objectId,
      },
    });
  });

  var request = window.gapi.client.slides.presentations.batchUpdate(
    requestPayload
  );

  request.then(function(response) {
    console.log(response);
  });
}

function createShape(data) {
  var request = window.gapi.client.slides.presentations.batchUpdate({
    presentationId: payload.destination_template,
    requests: [
      {
        createShape: {
          objectId: "newobj",
          elementProperties: {
            pageObjectId: data.result.slides[0].objectId,
            size: {
              width: {
                magnitude: "500",
                unit: "PT",
              },
              height: {
                magnitude: "500",
                unit: "PT",
              },
            },
          },
          shapeType: "RECTANGLE",
        },
      },
      {
        updatePageElementAltText: {
          objectId: "newobj",
          description: "background-color: color",
        },
      },
      {
        updateShapeProperties: {
          objectId: "newobj",
          shapeProperties: {
            outline: {
              propertyState: "NOT_RENDERED",
            },
          },
          fields: "*",
        },
      },
      {
        insertText: {
          objectId: "newobj",
          text: "{text}",
        },
      },
    ],
  });

  request.then(function(d) {
    console.log(d);
  });
}
