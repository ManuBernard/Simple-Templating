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
  create: function({ commit, rootGetters }, payload) {
    var uid = uuidv4();
    firebase.db
      .collection("projects")
      .doc(uid)
      .set({
        name: payload.projectname,
        userId: rootGetters["user/user"].id
      })
      .then(p => {
        commit("SELECT", uid);
        payload.callback(uid);
      });
  },

  remove: function({ commit }, project) {
    firebase.db
      .collection("projects")
      .doc(project.id)
      .delete();
  },
  update: function({}, payload) {
    firebase.db
      .collection("projects")
      .doc(payload.id)
      .update({ name: payload.name });
  },
  addDatabase: function({}, payload) {
    firebase.db
      .collection("projects")
      .doc(payload.project.id)
      .update({ database: payload.database });
  },
  removeDatabase: function({}, payload) {
    firebase.db
      .collection("projects")
      .doc(payload.project.id)
      .update({ database: null });
  },
  addTemplate: function({}, payload) {
    firebase.db
      .collection("projects")
      .doc(payload.project.id)
      .update({ template: payload.template });
  },
  removeTemplate: function({}, payload) {
    firebase.db
      .collection("projects")
      .doc(payload.project.id)
      .update({ template: null });
  },
  addFolder: function({}, payload) {
    firebase.db
      .collection("projects")
      .doc(payload.project.id)
      .update({ folder: payload.folder });
  },
  removeFolder: function({}, payload) {
    firebase.db
      .collection("projects")
      .doc(payload.project.id)
      .update({ folder: null });
  },
  bind: firestoreAction(({ bindFirestoreRef }, user) => {
    // return the promise returned by `bindFirestoreRef`
    return bindFirestoreRef(
      "projects",
      firebase.db.collection("projects").where("userId", "==", user.id)
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
