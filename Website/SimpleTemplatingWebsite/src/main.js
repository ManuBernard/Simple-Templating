import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store/store";
import vuetify from "./plugins/vuetify";
import googleFilePicker from "./plugins/googleFilePicker";
import "vue-awesome/icons";
import "./googleApi";

Vue.use(googleFilePicker);

//src/main.js
// import GAuth from "vue-google-oauth2";
// const gauthOption = {
//   clientId:
//     "543570048454-tblderg0v6u4bm9e5jtdk07lh0la85hi.apps.googleusercontent.com",
//   scope: "profile email",
//   prompt: "select_account"
// };

// Vue.use(GAuth, gauthOption);

/* Register component with one of 2 methods */

import Icon from "vue-awesome/components/Icon";

// globally (in your main .js file)
Vue.component("v-icon", Icon);

const firebase = require("./firebaseConfig.js");
require("./googleApi");

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
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
files.keys().map(key =>
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
  render: h => h(App)
}).$mount("#app");
