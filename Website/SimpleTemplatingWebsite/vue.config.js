process.env.VUE_APP_VERSION = require("./package.json").version;
process.env.VUE_APP_NAME = require("./package.json").name;

module.exports = {
  transpileDependencies: ["vuetify"]
};
