const state = {
  user: null
};

const getters = {
  user: function(state) {
    return state.user;
  }
};

const actions = {
  signin: function({ commit, dispatch }, user) {
    commit("SET", user);
    dispatch("projects/bind", user, { root: true });
  },
  signout: function({ commit }) {
    commit("SET", null);
  }
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
