import { vuexfireMutations, firestoreAction } from "vuexfire";

const firebase = require("@/firebaseConfig.js");

const state = {
  user: null
};

const getters = {
  user: function(state) {
    return state.user;
  }
};

const actions = {
  init: function({ commit, dispatch }) {
    firebase.auth().onAuthStateChanged(function(cred) {
      console.log(cred);
      if (cred) {
        dispatch("load", cred);
      }
    });
  },
  logout: function({ commit }) {
    firebase
      .auth()
      .signOut()
      .then(u => {
        commit("SET", null);
      });
  },

  load: function({ commit, dispatch }, credUser) {
    firebase.db
      .collection("users")
      .doc(credUser.uid)
      .get()
      .then(u => {
        let user = u;
        user.email = credUser.displayName;
        user.displayName = credUser.displayName;
        commit("SET", user);
        dispatch("projects/bind", user, { root: true });
      });
  },

  login: function({ commit, dispatch }) {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(cred => {
        if (cred.additionalUserInfo.isNewUser) {
          firebase.db
            .collection("users")
            .doc(cred.user.uid)
            .set({})
            .then(u => {
              dispatch("load", cred.user);
            });
        } else {
          dispatch("load", cred.user);
        }
      })
      .catch(err => {
        alert("oops" + err);
      });
  },
  connect(user) {}
};

const mutations = {
  SET: function(state, user) {
    state.user = user;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
