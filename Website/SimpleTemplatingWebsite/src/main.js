import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store/store";
import vuetify from "./plugins/vuetify";
import gapi from "./plugins/gapi/init";

const firebase = require("./firebaseConfig.js");

// Vue.component("v-icon", Icon);
Vue.use(gapi);

Vue.config.productionTip = false;

// Force Login
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
  const currentUser = firebase.auth().currentUser;

  if (requiresAuth && !currentUser) {
    next("/login");
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});

// Load all components
const files = require.context("./", true, /\.vue$/i);
files.keys().map((key) =>
  Vue.component(
    key
      .split("/")
      .pop()
      .split(".")[0],
    files(key).default
  )
);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
