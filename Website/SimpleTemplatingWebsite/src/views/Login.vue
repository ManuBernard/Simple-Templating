<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center" align="center">
      <v-col>
        <v-card
          flat
          color="transparent"
          max-width="500"
          class="mx-auto text-center"
        >
          <h1 style="font-size: 4rem" class="simpletemplatingtitle mb-10 pb-10">
            Simple Templating
          </h1>

          <v-img
            @click="signin"
            :src="require('../assets/signin.png')"
            class="mx-10 mt-3 mb-5 btn"
            contain
          />
          <p class="body-1">
            Sign in with your Google Account and start templating!
          </p>
        </v-card>
      </v-col>
    </v-row>
    <v-footer fixed bottom dark color="secondary">
      <v-row justify="left" no-gutters>
        <v-btn
          href="https://simpletemplating.com"
          color="white"
          text
          rounded
          class="my-2"
        >
          simpletemplating.com
        </v-btn>
        <v-btn
          href="https://simpletemplating.com/privacy-policy"
          color="white"
          text
          rounded
          class="my-2"
        >
          Privacy Policy
        </v-btn>
        <v-btn
          href="https://simpletemplating.com/terms-of-service"
          color="white"
          text
          rounded
          class="my-2"
        >
          Terms of service
        </v-btn>
        <v-btn
          href="https://simpletemplating.com/contact"
          color="white"
          text
          rounded
          class="my-2"
        >
          Contact
        </v-btn>
      </v-row>

      &copy;{{ new Date().getFullYear() }} Simple Templating V {{ APP_VERSION }}
    </v-footer>
  </v-container>
</template>

<script>
export default {
  data: function() {
    return {
      APP_VERSION: process.env.VUE_APP_VERSION,
    };
  },
  computed: {
    user() {
      return this.$store.getters["user/user"];
    },
  },
  methods: {
    signin() {
      this.$gapi.signin();
    },
  },
};
</script>
