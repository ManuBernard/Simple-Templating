<template>
  <v-app id="inspire">
    <template v-if="user">
      <v-app-bar
        app
        clipped-left
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-toolbar-title>Simple Templating</v-toolbar-title>

        <v-spacer></v-spacer>

        <div class="subtitle-1">{{ user.name }}</div>
        <v-menu
          right
          top
        >
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              v-on="on"
            >
              <v-avatar size="36px">
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
              <v-list-item-title>Settings</v-list-item-title>
            </v-list-item>
            <v-list-item @click="signout">
              <v-list-item-title>Sign out</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        app
        floating
        permanent
        clipped
      >
        <sidebar :drawer="drawer"></sidebar>
      </v-navigation-drawer>

      <v-content class="fill-height">
        <router-view></router-view>
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
    user () {
      return this.$store.getters["user/user"];
    }
  },

  methods: {
    signout () {
      this.$store.dispatch("user/signout");
    }
  },

  mounted () {
    // this.$gapi.currentUser().then(user => {
    //   if (user) {
    //     console.log("Signed in as %s", user.name);
    //   } else {
    //     console.log("No user is connected.");
    //   }
    // });
  },

  created () {
    // Array of API discovery doc URLs for APIs used by the quickstart
    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest", "https://sheets.googleapis.com/$discovery/rest?version=v4", "https://slides.googleapis.com/$discovery/rest?version=v1"];


    // included, separated by spaces.
    var SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/presentations';

    var self = this;
    this.$vuetify.theme.dark = false;
    this.$gapi.currentUser().then(user => {
      if (user) {
        this.$store.dispatch("user/signin", user);
        this.$gapi._load()
          .then(gapi => {
            gapi.load('client', function () {
              gapi.client.init({
                apiKey: self.$gapi.config.apiKey,
                clientId: self.$gapi.config.clientId,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES
              }).then(function (response) {

              }, function (error) {
                console.log(error)
              });
            });
          })
      } else {
        console.log("No user is connect.");
      }
    });
  }
};
</script>
