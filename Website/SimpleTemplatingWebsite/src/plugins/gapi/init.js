import handleClientLoad from "./auth";
import {
  filePicker,
  duplicateFile,
  createFile,
  createNewProject
} from "./drive";
import { readDatabase } from "./spreadsheets";
import { templetify } from "./presentations";
const api = {
  install(Vue) {
    Vue.prototype.$gapi = {
      init: function() {
        handleClientLoad();
      },
      signin: function() {
        window.gapi.auth2.getAuthInstance().signIn();
      },
      signout: function() {
        window.gapi.auth2.getAuthInstance().signOut();
      },
      filePicker: filePicker,
      createFile: createFile,
      duplicateFile: duplicateFile,
      readDatabase: readDatabase,
      createNewProject: createNewProject,
      templetify: templetify
    };
  }
};

export default api;
