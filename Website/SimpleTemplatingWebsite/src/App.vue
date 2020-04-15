<template>
  <v-app id="inspire">
    <template center v-if="!loaded">
      <v-container class="fill-height" fluid>
        <v-row justify="center" align="center">
          <v-col>
            <v-card flat max-width="300" class="mx-auto text-center">
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
      <v-app-bar dark app color="secondary accent-4" clipped-left>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-toolbar-title>{{ APP_NAME }}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn
          target="_blank"
          color="white"
          outlined
          href="http://simpletemplating.com/docs/"
        >
          Documentation <v-icon class="ml-2">mdi-help-circle-outline</v-icon>
        </v-btn>
        <v-menu right top>
          <template v-slot:activator="{ on }">
            <v-btn class="mx-2" icon v-on="on">
              <v-avatar class="ml-3">
                <img v-if="user.image" alt="Avatar" :src="user.image" />
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

      <v-navigation-drawer v-model="drawer" app clipped>
        <sidebar :drawer="drawer"></sidebar>
      </v-navigation-drawer>

      <v-content class="fill-height">
        <transition name="fade" mode="out-in">
          <router-view :key="$route.fullPath"></router-view>
        </transition>
      </v-content>
    </template>
    <template v-else>
      <v-content class="fill-height">
        <login></login>
      </v-content>
    </template>

    <v-footer app>
      <span
        >&copy; {{ new Date().getFullYear() }} {{ APP_NAME }}
        <span class="font-weight-thin">V {{ APP_VERSION }}</span></span
      >
    </v-footer>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },

  data: () => ({
    drawer: null,
    loaded: false,
    APP_VERSION: process.env.VUE_APP_VERSION,
    APP_NAME: process.env.VUE_APP_NAME
  }),

  computed: {
    user() {
      return this.$store.getters["user/user"];
    }
  },

  methods: {
    signout() {
      this.$gapi.signout();
    }
  },

  mounted() {
    let self = this;

    this.$store.dispatch("config/bind");

    this.$gapi.init(function() {
      self.loaded = true;
    });
  }
};
</script>

<style>
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
</style>
