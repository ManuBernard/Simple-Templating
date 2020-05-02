import store from "@/store/store";
const firebase = require("@/firebaseConfig.js");
let onSignInCallback = null;

// Client ID and API key from the Developer Console
var CLIENT_ID = process.env.VUE_APP_CLIENT_ID;

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
  "https://sheets.googleapis.com/$discovery/rest?version=v4",
  "https://slides.googleapis.com/$discovery/rest?version=v1",
];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES =
  "https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/presentations";

export function signIn() {
  const auth2 = window.gapi.auth2.getAuthInstance();

  auth2.signIn();
}

function handleIsSignedIn(isSignedIn) {
  if (isSignedIn) {
    const auth2 = window.gapi.auth2.getAuthInstance();
    const currentUser = auth2.currentUser.get();

    const authResponse = currentUser.getAuthResponse(true);
    const credential = firebase.auth.GoogleAuthProvider.credential(
      authResponse.id_token,
      authResponse.access_token
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then(({ user }) => {
        store.dispatch("user/signin", {
          id: user.uid,
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
        });
      });
    onSignInCallback();
  } else {
    onSignInCallback();
  }
}

export function init(cb) {
  onSignInCallback = cb;

  new Promise((resolve) => {
    window.gapi.load("client:auth2", () => {
      resolve();
    });
  })
    .then(() => {
      return window.gapi.client.init({
        apiKey: process.env.VUE_APP_apiKey,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });
    })
    .then(() => {})
    .then(() => {
      const auth2 = window.gapi.auth2.getAuthInstance();
      auth2.isSignedIn.listen(handleIsSignedIn);
      handleIsSignedIn(auth2.isSignedIn.get());
    });
  // window.gapi.load("client:auth2", initClient);
  window.gapi.load("picker");
}

export function signOut() {
  const auth2 = window.gapi.auth2.getAuthInstance();
  auth2
    .signOut()

    .then(() => {
      store.dispatch("user/signout");
      return firebase.auth().signOut();
    });
}
