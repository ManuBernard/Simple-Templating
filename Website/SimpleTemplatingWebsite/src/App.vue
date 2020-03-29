<template>
  <v-app id="inspire">
    <template v-if="user">
      <v-app-bar dark app color="primary accent-4" clipped-left>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-toolbar-title>Simple Templating</v-toolbar-title>

        <v-spacer></v-spacer>

        <div class="subtitle-1">{{ user.name }}</div>
        <v-menu right top>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-avatar size="36px">
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
              <v-list-item-title>Settings</v-list-item-title>
            </v-list-item>
            <v-list-item @click="signout">
              <v-list-item-title>Sign out</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" app floating permanent clipped>
        <sidebar :drawer="drawer"></sidebar>
      </v-navigation-drawer>

      <v-content class="fill-height">
        <transition name="fade" mode="out-in">
          <router-view :key="$route.fullPath"></router-view>
        </transition>
      </v-content>
    </template>
    <div v-else>
      <v-content class="fill-height">
        <login></login>
      </v-content>
    </div>

    <v-footer app>
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },

  data: () => ({
    drawer: null
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
    this.$gapi.init();
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
