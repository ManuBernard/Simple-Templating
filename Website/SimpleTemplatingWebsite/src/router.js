import Vue from "vue";
import Router from "vue-router";
import Projects from "./views/Projects.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "projects",
      component: Projects,
    },

    {
      path: "/login",
      name: "login",
      component: () =>
        import(/* webpackChunkName: "login" */ "./views/Login.vue"),
    },
    {
      path: "/newproject",
      name: "newproject",
      component: () =>
        import(/* webpackChunkName: "login" */ "./views/Newproject.vue"),
    },
    {
      path: "/project/:id",
      name: "project",
      component: () =>
        import(/* webpackChunkName: "login" */ "./views/Project.vue"),
    },
  ],
});
