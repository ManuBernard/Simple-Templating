import firebase from "firebase";
import "firebase/firestore";

// firebase init goes here
const config = {
  apiKey: "AIzaSyDj7SLv5PK6SyHzSVZVdmLeMV5eJILEN58",
  authDomain: "simple-templating-sheet2slide.firebaseapp.com",
  databaseURL: "https://simple-templating-sheet2slide.firebaseio.com",
  projectId: "simple-templating-sheet2slide",
  storageBucket: "simple-templating-sheet2slide.appspot.com",
  messagingSenderId: "543570048454",
  appId: "1:543570048454:web:69d41b9206b22bc076aec7",
  measurementId: "G-GN7EBJJPDH",
};
firebase.initializeApp(config);

// firebase utils
const db = firebase.firestore();
const auth = firebase.auth;
const currentUser = auth.currentUser;

// date issue fix according to firebase
const settings = {};
db.settings(settings);

// firebase collections
const usersCollection = db.collection("users");
const postsCollection = db.collection("posts");
const commentsCollection = db.collection("comments");
const likesCollection = db.collection("likes");

export {
  db,
  auth,
  currentUser,
  usersCollection,
  postsCollection,
  commentsCollection,
  likesCollection,
};
