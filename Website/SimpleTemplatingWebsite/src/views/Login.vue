<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center" align="center">
      <v-col>
        <h1>Please login to your Google Account</h1>
        <google-signin-btn
          label="Sign In"
          customClass="my-button"
          @click="login"
        >
        </google-signin-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters["user/user"];
    }
  },
  methods: {
    login() {
      this.$gapi
        .signIn()
        .then(user => {
          this.$store.dispatch("user/signin", user);
        })
        .catch(err => {
          console.error("Not signed in: %s", err.error);
        });
    },

    logout() {
      this.$gapi
        .signOut()
        .then(user => {
          this.$store.dispatch("user/signout");
        })
        .catch(err => {
          console.error("Not signed in: %s", err.error);
        });
    }
  }
};
</script>
