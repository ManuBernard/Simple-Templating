function generate_cards(templateId, folderId, dataBaseId, name) {
  // 1 : récupération de la liste des cartes dans la sheet
  var cards = getCards(dataBaseId);

  // 2 : on créé le fichier à partir du template souhaité, avec le nom paramétré
  var presentation = createPresentation(templateId, name, folderId);

  // 3 : on construit la liste des cartes
  createCards(cards, presentation.id);

  return presentation.id;
}
