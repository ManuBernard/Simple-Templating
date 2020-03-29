import { firestoreAction } from "vuexfire";
import { v4 as uuidv4 } from "uuid";

const firebase = require("@/firebaseConfig.js");

const state = {
  projects: []
};

const getters = {
  byId: function(state) {
    return function(id) {
      return state.projects.find(element => element.id == id);
    };
  },
  projects: function(state) {
    return state.projects;
  }
};

const actions = {
  // Project
  create: function({ dispatch, rootGetters }, payload) {
    firebase.db
      .collection("users")
      .doc(rootGetters["user/user"].id)
      .collection("projects")
      .doc(payload.project.id)
      .set({
        name: payload.name,
        created: Date.now()
        // userId: rootGetters["user/user"].id
      })
      .then(p => {
        dispatch("addDatabase", payload);
        dispatch("addTemplate", payload);
        dispatch("addFolder", payload);
        payload.callback();
      });
  },
  remove: function({ commit, rootGetters }, project) {
    firebase.db
      .collection("users")
      .doc(rootGetters["user/user"].id)
      .collection("projects")
      .doc(project.id)
      .delete();
  },
  update: function({ rootGetters }, payload) {
    firebase.db
      .collection("users")
      .doc(rootGetters["user/user"].id)
      .collection("projects")
      .doc(payload.id)
      .update({ name: payload.name });
  },

  // Database
  addDatabase: function({ rootGetters }, payload) {
    firebase.db
      .collection("users")
      .doc(rootGetters["user/user"].id)
      .collection("projects")
      .doc(payload.project.id)
      .update({ database: payload.database });
  },
  removeDatabase: function({ rootGetters }, payload) {
    firebase.db
      .collection("users")
      .doc(rootGetters["user/user"].id)
      .collection("projects")
      .doc(payload.project.id)
      .update({ database: null });
  },

  // Template
  addTemplate: function({ rootGetters }, payload) {
    firebase.db
      .collection("users")
      .doc(rootGetters["user/user"].id)
      .collection("projects")
      .doc(payload.project.id)
      .update({ template: payload.template });
  },
  removeTemplate: function({ rootGetters }, payload) {
    firebase.db
      .collection("users")
      .doc(rootGetters["user/user"].id)
      .collection("projects")
      .doc(payload.project.id)
      .update({ template: null });
  },

  // Folder
  addFolder: function({ rootGetters }, payload) {
    firebase.db
      .collection("users")
      .doc(rootGetters["user/user"].id)
      .collection("projects")
      .doc(payload.project.id)
      .update({ folder: payload.folderExport });
  },
  removeFolder: function({ rootGetters }, payload) {
    firebase.db
      .collection("users")
      .doc(rootGetters["user/user"].id)
      .collection("projects")
      .doc(payload.project.id)
      .update({ folder: null });
  },

  // Bind to firebase
  bind: firestoreAction(({ bindFirestoreRef, rootGetters }, user) => {
    return bindFirestoreRef(
      "projects",
      firebase.db
        .collection("users")
        .doc(rootGetters["user/user"].id)
        .collection("projects")
        .orderBy("created", "desc")
      // firebase.db.collection("projects").where("userId", "==", user.id)
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
