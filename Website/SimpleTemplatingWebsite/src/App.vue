<template>
  <v-app id="inspire">
    <template
      center
      v-if="!loaded"
    >
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          justify="center"
          align="center"
        >
          <v-col>
            <v-card
              flat
              max-width="300"
              color="transparent"
              class="mx-auto text-center"
            >
              <v-progress-circular
                indeterminate
                size="64"
              ></v-progress-circular>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
    <template v-else-if="user">
      <v-navigation-drawer
        id="sider"
        v-model="drawer"
        app
        dark
        mobile-break-point="1024"
      >
        <h1 class="my-6 text-center white--text simpletemplatingtitle">
          Simple<br />Templating
        </h1>

        <sidebar :drawer="drawer"></sidebar>

        <div style="height: 70px;"></div>

        <v-footer
          fixed
          color="rgba(0,0,0,0.9)"
          class=" py-3 body-1 "
        >
          <a
            class="white--text legal"
            target="_blank"
            href="https://simpletemplating.com/privacypolicy/"
          >Privacy policy</a>
          &nbsp;

          <a
            class="white--text legal"
            target="_blank"
            href="https://simpletemplating.com/contact/"
          >Contact</a>

          <span class="body-2 mt-1 font-weight-thin">
            &copy;{{ new Date().getFullYear() }} {{ APP_NAME }} V{{
              APP_VERSION
            }}
          </span>
        </v-footer>
      </v-navigation-drawer>

      <v-app-bar
        app
        color="orange lighten-5"
        flat
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-spacer></v-spacer>
        <v-btn
          target="_blank"
          color="primary"
          outlined
          class="mr-3"
          href="http://simpletemplating.com/docs/"
        >
          Docs <v-icon class="ml-2">mdi-help-circle-outline</v-icon>
        </v-btn>
        <v-menu
          right
          top
        >
          <template v-slot:activator="{ on }">
            <v-btn
              class="mx-2"
              icon
              v-on="on"
            >
              <v-avatar size="43">
                <img
                  v-if="user.image"
                  alt="Avatar"
                  :src="user.image"
                />
                <v-icon
                  v-else
                  :color="message.color"
                  v-text="message.icon"
                ></v-icon>
              </v-avatar>
            </v-btn>
          </template>

          <v-list>
            <v-list-item @click="signout">
              <v-list-item-title>Sign out</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
      <v-content>
        <v-container fluid>
          <transition
            name="fade"
            mode="out-in"
          >

            <router-view :key="$route.fullPath"></router-view>
          </transition>
        </v-container>
      </v-content>
    </template>
    <template v-else>
      <v-content class="fill-height">

        <login></login>
      </v-content>
    </template>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String,
  },

  data: () => ({
    drawer: null,
    loaded: false,
    APP_VERSION: process.env.VUE_APP_VERSION,
    APP_NAME: process.env.VUE_APP_NAME,
  }),

  computed: {
    user () {
      return this.$store.getters["user/user"];
    },
  },

  methods: {
    signout () {
      this.$gapi.signout();
    },
  },

  mounted () {
    let self = this;

    this.$store.dispatch("config/bind");

    this.$gapi.init(function () {
      self.loaded = true;
    });
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Lobster&display=swap");

#sider {
  background-image: linear-gradient(
      to bottom,
      rgba(1, 1, 1, 0.92),
      rgba(1, 1, 1, 0.85)
    ),
    url("~@/assets/machine.jpg");
  background-size: cover;
  background-attachment: fixed;
}
.simpletemplatingtitle {
  font-family: "Lobster", cursive;
  font-size: 2rem;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.legal {
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
</style>
