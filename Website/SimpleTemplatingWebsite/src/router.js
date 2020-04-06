import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },

    {
      path: "/login",
      name: "login",
      component: () =>
        import(/* webpackChunkName: "login" */ "./views/Login.vue")
    },
    {
      path: "/newproject",
      name: "newproject",
      component: () =>
        import(/* webpackChunkName: "login" */ "./views/Newproject.vue")
    },
    {
      path: "/project/:id",
      name: "project",
      component: () =>
        import(/* webpackChunkName: "login" */ "./views/Project.vue")
    }
  ]
});
