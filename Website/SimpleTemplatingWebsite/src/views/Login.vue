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
          max-width="400"
          class="mx-auto text-center"
        >
          <h1 class="simpletemplatingtitle">Simple Templating</h1>

          <v-img
            @click="signin"
            :src="require('../assets/signin.png')"
            class="mt-3 mb-10"
            contain
          />
          <a href="https://simpletemplating.com">Simple templating</a> -
          <a href="https://simpletemplating.com/privacypolicy">Privacy Policy</a>
          -
          <a href="https://simpletemplating.com/contact">Contact</a>
        </v-card>
      </v-col>
    </v-row>
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
