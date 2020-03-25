import Vue from "vue";
import store from "@/store/store";

// Client ID and API key from the Developer Console
var CLIENT_ID =
  "543570048454-tblderg0v6u4bm9e5jtdk07lh0la85hi.apps.googleusercontent.com";
var API_KEY = "AIzaSyDj7SLv5PK6SyHzSVZVdmLeMV5eJILEN58";

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
  "https://sheets.googleapis.com/$discovery/rest?version=v4",
  "https://slides.googleapis.com/$discovery/rest?version=v1"
];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES =
  "https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/presentations";

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  gapi.load("client:auth2", initClient);
  gapi.load("picker");
}

// handleClientLoad();

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client
    .init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    })
    .then(
      function() {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      },
      function(error) {
        appendPre(JSON.stringify(error, null, 2));
      }
    );
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    var profile = gapi.auth2
      .getAuthInstance()
      .currentUser.get()
      .getBasicProfile();

    store.dispatch("user/signin", {
      id: profile.getId(),
      name: profile.getName(),
      email: profile.getEmail(),
      image: profile.getImageUrl()
    });
  } else {
    store.dispatch("user/signout", {});
  }
}

export default handleClientLoad;
