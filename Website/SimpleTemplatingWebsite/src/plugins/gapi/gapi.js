import handleClientLoad from "./auth";
import { filePicker, createDb } from "./drive";

const api = {
  install(Vue) {
    Vue.prototype.$gapi = {
      init: function() {
        handleClientLoad();
      },
      signin: function() {
        gapi.auth2.getAuthInstance().signIn();
      },
      signout: function() {
        gapi.auth2.getAuthInstance().signOut();
      },
      filePicker: filePicker,
      createDb: createDb
    };
  }
};

export default api;
