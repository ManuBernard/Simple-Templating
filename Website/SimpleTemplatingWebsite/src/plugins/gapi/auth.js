import store from "@/store/store";
let onSignInCallback = null;

// Client ID and API key from the Developer Console
var CLIENT_ID = process.env.VUE_APP_CLIENT_ID;
var API_KEY = process.env.VUE_APP_API_KEY;

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
  "https://sheets.googleapis.com/$discovery/rest?version=v4",
  "https://slides.googleapis.com/$discovery/rest?version=v1"
];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES =
  "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/presentations";

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad(callback) {
  onSignInCallback = callback;
  window.gapi.load("client:auth2", initClient);
  window.gapi.load("picker");
}

// handleClientLoad();

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  window.gapi.client
    .init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    })
    .then(
      function() {
        window.gapi.auth2
          .getAuthInstance()
          .isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(
          window.gapi.auth2.getAuthInstance().isSignedIn.get()
        );
      },
      function(error) {}
    );
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    var profile = window.gapi.auth2
      .getAuthInstance()
      .currentUser.get()
      .getBasicProfile();

    store.dispatch("user/signin", {
      id: profile.getId(),
      name: profile.getName(),
      email: profile.getEmail(),
      image: profile.getImageUrl()
    });

    onSignInCallback();
  } else {
    store.dispatch("user/signout", {});
    onSignInCallback();
  }
}

export default handleClientLoad;
