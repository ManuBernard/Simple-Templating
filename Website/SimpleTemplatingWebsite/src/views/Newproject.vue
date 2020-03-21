<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center" align="center">
      <v-col>
        <v-card max-width="500" class="mx-auto">
          <v-card-title class="primary">
            New project
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" @submit="add">
              <v-text-field
                v-model="projectname"
                :counter="30"
                :rules="nameRules"
                label="Project name"
                required
              ></v-text-field>

              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="add"
              >
                Submit
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {},

  data() {
    return {
      projectname: null,
      valid: true,
      name: "",
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 30) || "Name must be less than 30 characters"
      ]
    };
  },

  methods: {
    add() {
      const self = this;
      const payload = {
        projectname: this.projectname,
        callback: function(uid) {
          self.$router.push("/project/" + uid);
        }
      };

      this.$store.dispatch("projects/create", payload);
      this.projectname = "";
    }
  },
  created() {}
};
</script>
