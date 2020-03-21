const GoogleFilePicker = {
  install(Vue) {
    Vue.prototype.$googleFilePicker = function(type, callback) {
      function cb(data) {
        callback(data.docs[0]);
      }
      this.$gapi._libraryLoad("auth2").then(auth2 => {
        var token = auth2.getAuthInstance().currentUser.je.uc.access_token;

        this.$gapi._libraryLoad("picker").then(googlePicker => {
          const gapi = googlePicker.api;

          var view = new gapi.DocsView(gapi.ViewId[type]);
          if (type == "FOLDERS") {
            view.setIncludeFolders(true);
            view.setSelectFolderEnabled(true);
          }

          var picker = new gapi.PickerBuilder()
            .enableFeature(gapi.Feature.NAV_HIDDEN)
            .setOAuthToken(token)
            .addView(view)
            .addView(new gapi.DocsUploadView())
            .setCallback(cb)
            .build();

          picker.setVisible(true);
        });
      });
    };
  }
};

export default GoogleFilePicker;
