import { signIn, signOut, init } from "./auth";
import {
  filePicker,
  duplicateFile,
  createFile,
  createNewProject,
} from "./drive";
import { readDatabase } from "./spreadsheets";
import { templetify } from "./presentations";
import { newProject } from "./newproject";

const api = {
  install(Vue) {
    Vue.prototype.$gapi = {
      init: function(cb) {
        init(cb);
      },
      signin: function() {
        signIn();
      },
      signout: function() {
        signOut();
      },
      filePicker: filePicker,
      createFile: createFile,
      duplicateFile: duplicateFile,
      readDatabase: readDatabase,
      newProject: newProject,
      templetify: templetify,
    };
  },
};

export default api;
