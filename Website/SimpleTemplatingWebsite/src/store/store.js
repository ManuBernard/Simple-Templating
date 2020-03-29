import Vue from "vue";
import Vuex from "vuex";
import { vuexfireMutations } from "vuexfire";

import projects from "@/store/projects";
import user from "@/store/user";
import exports from "@/store/exports";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    projects,
    user,
    exports
  },
  mutations: vuexfireMutations
});
