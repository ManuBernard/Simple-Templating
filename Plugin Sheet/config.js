// Project
function CONFIG(key) {
  var config = {
    PROPERTY_PROKEY: "proKey"
  };

  return config[key] ? config[key] : "Missing config";
}
