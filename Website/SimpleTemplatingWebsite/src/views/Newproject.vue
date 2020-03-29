<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center" align="center">
      <v-col>
        <v-card max-width="500" class="mx-auto">
          <v-card-title class="primary">
            New project
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" @submit.prevent="add">
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

            <div v-if="!folderRoot">
              By default, your project will be created at the root of your
              Drive.
              <a color="primary" @click.prevent="selectFolder">
                Change location
              </a>
            </div>
            <div v-else>
              Output folder : {{ folder.root }}
              <a color="primary" @click.prevent="selectFolder">
                Change folder
              </a>
            </div>
          </v-card-text>
        </v-card>

        <v-overlay v-if="loading">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {},

  data() {
    return {
      loading: false,
      projectname: null,

      folderRoot: null,

      valid: true,
      name: "",
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 30) || "Name must be less than 30 characters"
      ]
    };
  },

  methods: {
    selectFolder() {
      const self = this;
      this.$gapi.filePicker("FOLDERS", cb);
      function cb(data) {
        self.folderRoot = data;
      }
    },

    add() {
      const self = this;
      self.loading = true;
      this.$gapi.createNewProject(
        {
          name: this.projectname
          // parent: '1klgjMT4VxC0w1lHr-ibP6yTFLpaLzAak'
        },
        function(data) {
          self.saveProject(data);
        }
      );
    },

    saveProject(data) {
      var self = this;
      const payload = {
        name: self.projectname,
        database: data.database,
        template: data.template,
        folderExport: data.folderExport,
        project: data.folderRoot,
        callback: function() {
          self.redirect(data.folderRoot.id);
        }
      };

      this.$store.dispatch("projects/create", payload);
    },

    redirect(id) {
      this.projectname = "";
      this.$router.push("/project/" + id);
    }
  }
};
</script>
