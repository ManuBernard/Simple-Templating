import { firestoreAction } from "vuexfire";

const firebase = require("@/firebaseConfig.js");

const state = {
  templates: []
};

const getters = {
  templates: function(state) {
    return state.templates;
  }
};

const actions = {
  // Bind to firebase
  bind: firestoreAction(({ bindFirestoreRef, rootGetters }, user) => {
    return bindFirestoreRef(
      "templates",
      firebase.db
        .collection("config")
        .doc("project_templates")
        .collection("projects")
    );
  })
};

const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
