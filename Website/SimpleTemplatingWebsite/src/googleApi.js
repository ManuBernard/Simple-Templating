import Vue from "vue";
import VueGoogleApi from "vue-google-api";

const config = {
  apiKey: "AIzaSyDj7SLv5PK6SyHzSVZVdmLeMV5eJILEN58",
  clientId:
    "543570048454-tblderg0v6u4bm9e5jtdk07lh0la85hi.apps.googleusercontent.com",
  scope: "https://www.googleapis.com/auth/drive.file",
  discoveryDocs: ["https://people.googleapis.com/$discovery/rest"]
};

Vue.use(VueGoogleApi, config);
