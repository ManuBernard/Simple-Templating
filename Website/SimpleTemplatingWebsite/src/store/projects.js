import { firestoreAction } from "vuexfire";
import { v4 as uuidv4 } from "uuid";

const firebase = require("@/firebaseConfig.js");

const state = {
  projects: [],
  currentProjectId: null
};

const getters = {
  current: function(state) {
    return state.projects.find(element => element.id == state.currentProjectId);
  },
  projects: function(state) {
    return state.projects;
  }
};

const actions = {
  create: function({ commit, rootGetters }, projectname) {
    var uid = uuidv4();
    firebase.db
      .collection("projects")
      .doc(uid)
      .set({
        name: projectname,
        userId: rootGetters["user/user"].id
      })
      .then(p => {
        commit("SELECT", uid);
      });
  },
  select: function({ commit }, project) {
    commit("SELECT", project.id);
  },
  remove: function({ rootGetters }, project) {
    firebase.db
      .collection("projects")
      .doc(project.id)
      .delete();
  },
  update: function({ rootGetters }, payload) {
    firebase.db
      .collection("projects")
      .doc(payload.id)
      .update({ name: payload.name });
  },
  bind: firestoreAction(({ bindFirestoreRef, rootGetters }, user) => {
    // return the promise returned by `bindFirestoreRef`
    return bindFirestoreRef(
      "projects",
      firebase.db.collection("projects").where("userId", "==", user.id)
    );
  })
};

const mutations = {
  SELECT: function(state, projectId) {
    state.currentProjectId = projectId;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
