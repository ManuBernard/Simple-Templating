import Vue from "vue";
import Vuex from "vuex";
import { vuexfireMutations } from "vuexfire";

import projects from "@/store/projects";
import user from "@/store/user";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    projects,
    user
  },
  mutations: vuexfireMutations
});
