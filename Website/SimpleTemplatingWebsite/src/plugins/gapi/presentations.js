import { duplicateFile } from "./drive";

export function templetify(project, count, callback) {
  duplicateFile(
    {
      fileId: project.template.id,
      name: project.name + " #" + count,
      parent: project.folder.id
    },
    function(data) {
      callback(data);
    }
  );
}
// console.log(gapi.client.slides.presentations);

// gapi.client.slides.presentations
//   .get({
//     presentationId: self.project.template.id
//   })
//   .then(function(response) {
//     console.log(response);

//     var requests = [
//       {
//         duplicateObject: {
//           objectId: response.result.slides[0].objectId
//         }
//       },
//       {
//         duplicateObject: {
//           objectId: response.result.slides[0].objectId
//         }
//       },
//       {
//         duplicateObject: {
//           objectId: response.result.slides[0].objectId
//         }
//       },
//       {
//         duplicateObject: {
//           objectId: response.result.slides[0].objectId
//         }
//       },
//       {
//         duplicateObject: {
//           objectId: response.result.slides[0].objectId
//         }
//       }
//     ];

//     gapi.client.slides.presentations
//       .batchUpdate({
//         presentationId: self.project.template.id,
//         requests: requests
//       })
//       .then(createSlideResponse => {
//         console.log(createSlideResponse);
//       });
//   });
