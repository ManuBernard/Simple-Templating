// Project dictionnary
function DICTIONNARY(key) {
  var texts = {
    SIDEBAR_TITLE: "Simple Templating",
    DEFAULT_EXPORTED_FILENAME: "SimpleTemplating Generated File"
  };

  return texts[key] ? texts[key] : "Missing Text";
}
