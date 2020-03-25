import Vue from "vue";
import VueGoogleApi from "vue-google-api";

const config = {
  apiKey: "AIzaSyDj7SLv5PK6SyHzSVZVdmLeMV5eJILEN58",
  clientId:
    "543570048454-tblderg0v6u4bm9e5jtdk07lh0la85hi.apps.googleusercontent.com",
  scope:
    "https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/presentations",
  discoveryDocs: [
    "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
    "https://sheets.googleapis.com/$discovery/rest?version=v4",
    "https://slides.googleapis.com/$discovery/rest?version=v1"
  ]
};

Vue.use(VueGoogleApi, config);
