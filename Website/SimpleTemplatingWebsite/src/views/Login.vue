<template>
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
          color="transparent"
          max-width="500"
          class="mx-auto text-center"
        >
          <h1
            style="font-size: 4rem"
            class="simpletemplatingtitle mb-10 pb-10"
          >Simple Templating</h1>

          <v-img
            @click="signin"
            :src="require('../assets/signin.png')"
            class="mx-10 mt-3 mb-5 btn"
            contain
          />
          <p class="body-1">Sign in with your Google Account and start templating!</p>

        </v-card>
      </v-col>
    </v-row>
    <v-footer
      fixed
      bottom
      dark
      color="secondary darken-2"
    >
      <a href="https://simpletemplating.com">Simple templating</a> -
      <a href="https://simpletemplating.com/privacy-policy">Privacy Policy</a> -

      <a href="https://simpletemplating.com/terms-of-service/">Terms of service</a>
      -
      <a href="https://simpletemplating.com/contact">Contact</a>
    </v-footer>
  </v-container>
</template>

<script>
export default {
  computed: {
    user () {
      return this.$store.getters["user/user"];
    },
  },
  methods: {
    signin () {
      this.$gapi.signin();
    },
  },
};
</script>
