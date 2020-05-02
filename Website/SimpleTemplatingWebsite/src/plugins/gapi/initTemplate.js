/* Initialize a new database from the projecttemplate database */

/* 1 initialize : copy the sheet "database" from projecttemplate database to freshly created database */
export function initTemplate(template) {
  var requests = {
    presentationId: template.id,
    requests: [
      {
        insertText: {
          objectId: "i0",
          text: "{{title}}",
        },
      },
      {
        insertText: {
          objectId: "i1",
          text: "{{description}}",
        },
      },
    ],
  };

  window.gapi.client.slides.presentations.batchUpdate(requests).then(() => {});
}
