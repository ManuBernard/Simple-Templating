function createPresentation(templateId, name, folderId) {
  var copyFile = {
    title: formatDate() + " " + name,
    parents: [{ id: folderId }]
  };

  copyFile = Drive.Files.copy(copyFile, templateId);

  var presentationId = copyFile.id;

  Logger.log("Created new presentation id: " + presentationId);
  return copyFile;
}
