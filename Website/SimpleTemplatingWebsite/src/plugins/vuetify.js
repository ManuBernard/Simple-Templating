import Vue from "vue";
import Vuetify from "vuetify/lib";

import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

new Vuetify({
  theme: {
    themes: {
      light: {
        secondary: colors.blueGrey.darken4,
        primary: colors.brown.base,
        accent: "#8c9eff",
        error: "#b71c1c"
      }
    }
  }
});

export default new Vuetify({
  icons: {
    iconfont: "mdiSvg"
  }
});
