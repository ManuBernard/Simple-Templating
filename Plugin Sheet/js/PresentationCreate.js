function presentationCreate(templateId, name, folderId) {
  var copyFile = {
    title: formatDate() + " " + name,
    parents: [{ id: folderId }]
  };

  copyFile = Drive.Files.copy(copyFile, templateId);

  return copyFile;
}
