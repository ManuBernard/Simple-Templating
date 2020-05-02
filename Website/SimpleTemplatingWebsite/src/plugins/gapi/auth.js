import store from "@/store/store";
const firebase = require("@/firebaseConfig.js");
let onSignInCallback = null;

// Client ID and API key from the Developer Console
var CLIENT_ID = process.env.VUE_APP_CLIENT_ID;
var API_KEY = process.env.VUE_APP_API_KEY;

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
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope(SCOPES);
  firebase.auth().signInWithRedirect(provider);
}

export function onSignIn(cb) {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      store.dispatch("user/signin", {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      });
      cb();
    } else {
      // No user is signed in.
      store.dispatch("user/signout");
    }
  });

  // firebase
  //   .auth()
  //   .getRedirectResult()
  //   .then(function(result) {
  //     if (result.user) {
  //       store.dispatch("user/signin", {
  //         id: result.user.uid,
  //         name: result.user.displayName,
  //         email: result.user.email,
  //         image: result.user.photoURL,
  //       });
  //     }
  //   })
  //   .catch(function(error) {});
}

export function signOut() {
  firebase
    .auth()
    .signOut()
    .then(function() {
      // Sign-out successful.
    })
    .catch(function(error) {
      // An error happened.
    });
}
