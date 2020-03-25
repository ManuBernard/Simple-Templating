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
        <h1>Please login to your Google Account</h1>
        <v-btn
          color=primary
          @click=signin
        >Signin</v-btn>
        <!-- <google-signin-btn
          label="Sign In"
          customClass="my-button"
          @click="login"
        >
        </google-signin-btn> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    user () {
      return this.$store.getters["user/user"];
    }
  },
  methods: {
    signin () {
      this.$gapi.signin();
    }
  }
};
</script>
