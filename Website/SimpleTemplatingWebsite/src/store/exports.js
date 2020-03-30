import { firestoreAction } from "vuexfire";
import { v4 as uuidv4 } from "uuid";

const firebase = require("@/firebaseConfig.js");

const state = {
  exports: []
};

const getters = {
  byId: function(state) {
    return function(id) {
      return state.exports.find(element => element.id == id);
    };
  },
  exports: function(state) {
    return state.exports;
  }
};

const actions = {
  // push history
  push: function({ rootGetters }, payload) {
    firebase.db
      .collection("users")
      .doc(rootGetters["user/user"].id)
      .collection("projects")
      .doc(payload.project.id)
      .collection("exports")
      .doc(payload.id)
      .set({ name: payload.name, created: Date.now() })
      .then(function() {
        payload.callback(payload);
      });
  },

  bind: firestoreAction(({ bindFirestoreRef, rootGetters }, projectId) => {
    return bindFirestoreRef(
      "exports",
      firebase.db
        .collection("users")
        .doc(rootGetters["user/user"].id)
        .collection("projects")
        .doc(projectId)
        .collection("exports")
        .orderBy("created", "desc")
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
