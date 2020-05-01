<template>
  <div v-if="project">
    <v-container fluid>
      <h1 class="display-2 mb-5">
        <span class="font-weight-thin">The</span> {{ project.name }}
        <span class="font-weight-thin">project</span>

        <v-btn
          icon
          class="ml-5"
          color="primary"
          @click.stop="showRenamer"
        >
          <v-icon>mdi-pencil-outline</v-icon>
        </v-btn>
      </h1>
      <v-card
        color="secondary"
        class="elevation-5 py-2 py-md-5"
      >
        <v-container>
          <v-row
            class="mb-2"
            justify="center"
            align="center"
          >
            <v-col>
              <project-file-picker
                :type="'database'"
                :file="project.database"
                @select="selectDatabase"
              ></project-file-picker>
            </v-col>

            <v-col
              cols="12"
              sm="3"
              lg="2"
              class="text-center d-none d-md-flex justify-center"
            >
              <v-icon
                color="secondary lighten-1"
                class="display-4"
              >mdi-plus</v-icon>
            </v-col>

            <v-col>
              <project-file-picker
                :type="'template'"
                :file="project.template"
                @select="selectTemplate"
              ></project-file-picker>
            </v-col>
          </v-row>
        </v-container>
      </v-card>

      <v-card
        flat
        color="transparent"
        class="text-center mt-n6 mb-5 mb-sm-0"
      >
        <v-btn
          color="primary text-center center elevation-10"
          x-large
          rounded
          :disabled="!validTempletify"
          @click="templetify"
        >Templetify <v-icon class="ml-2">mdi-auto-fix</v-icon>
        </v-btn>
      </v-card>

      <v-toolbar
        color="transparent"
        flat
        class=""
      >
        <template v-if="project.folder">

          Output folder:
          <v-btn
            text
            color="primary"
            target="_blank"
            class=""
            :href="
              'https://docs.google.com/drive/u/0/folders/' + project.folder.id
            "
          >
            {{ project.folder.name }}
          </v-btn>
        </template>
        <v-btn
          color="primary"
          outlined
          @click="selectFolder"
          v-else
        >
          <v-icon class="mr-3">mdi-settings</v-icon> Select export folder
        </v-btn>
      </v-toolbar>

      <v-data-table
        class="transparent"
        color="transparent"
        :headers="headers"
        :items="formatedExports"
        :items-per-page="5"
      >
        <template v-slot:item.link="{ item }">
          <v-btn
            outlined
            target="_blank"
            color="primary"
            :href="item.link"
          >View
          </v-btn>
        </template>
      </v-data-table>

      <v-card
        color="transparent"
        flat
        max-width="500"
        class="float-right mt-3 mb-10"
      >
        <template v-if="!remove">
          <v-btn
            outlined
            tile
            color="error"
            @click="remove = true"
          >
            Remove project
          </v-btn>
        </template>
        <template v-else>
          <v-btn
            outlined
            tile
            color="secondary"
            class="mr-4"
            @click="remove = false"
          >
            Cancel
          </v-btn>
          <v-btn
            outlined
            tile
            color="error"
            @click="removeProject"
          >
            Confirm remove project
          </v-btn>
          <v-card
            flat
            color="transparent"
            class="text-right mt-2 body-1"
          >
            Files from your Google Drive will not be deleted.
          </v-card>
        </template>
      </v-card>
    </v-container>

    <v-overlay
      clipped-left
      color="secondary"
      opacity="0.8"
      v-if="loading"
      z-index="9999"
    >
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>

    <v-overlay
      color="primary"
      opacity="0.8"
      z-index="9999"
      class="text-center"
      v-if="lastGenerated"
    >
      <v-icon class="display-4 mb-10">mdi-thumb-up-outline</v-icon>

      <h2 class="display-1 font-weight-bold  mb-10">
        {{ lastGenerated.name }} has been generated
      </h2>

      <v-btn
        @click="openLastGenerated"
        x-large
        class="mr-4"
      >
        Open it
      </v-btn>
      <v-btn
        @click="lastGenerated = null"
        fab
        text
        x-large
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-overlay>

    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Rename project
        </v-card-title>

        <v-card-text>
          <v-form
            class="my-10"
            ref="form"
            v-model="valid"
            @submit.prevent="savename"
          >
            <v-text-field
              v-model="projectname"
              :counter="30"
              :rules="nameRules"
              label="Project name"
              required
              autofocus="true"
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="secondary"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            :disabled="!valid"
            color="primary"
            class="mr-4"
            @click="savename"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
var moment = require("moment");

export default {
  computed: {
    project () {
      return this.$store.getters["projects/byId"](this.$route.params.id);
    },

    validTempletify () {
      let v = true;
      if (!this.project.template) v = false;
      if (!this.project.database) v = false;
      if (!this.project.folder) v = false;
      return v;
    },

    exports () {
      return this.$store.getters["exports/exports"];
    },
    formatedExports () {
      var ret = [];

      this.exports.forEach((exp) => {
        ret.push({
          name: exp.name,
          created: moment(exp.created).format("MMM Do YYYY HH:mm"),
          link: "https://docs.google.com/presentation/d/" + exp.id + "/edit",
        });
      });
      return ret;
    },
  },

  data () {
    return {
      moment: moment,
      remove: false,
      loading: false,
      lastGenerated: null,
      projectname: null,
      dialog: false,
      valid: true,
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 30) || "Name must be less than 30 characters",
      ],
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: true,
          value: "name",
        },
        { text: "Created", value: "created" },
        { text: "Link", value: "link" },
      ],
    };
  },

  methods: {
    showRenamer () {
      this.dialog = true;
      this.projectname = this.project.name;
    },

    savename () {
      this.dialog = false;
      this.$store.dispatch("projects/update", {
        id: this.project.id,
        name: this.projectname,
      });
    },

    templetify () {
      var self = this;
      this.loading = true;

      this.$gapi.templetify(this.project, self.exports.length + 1, function (
        data
      ) {
        data.project = self.project;
        data.callback = function (exportFile) {
          var sound = require("../assets/success.mp3");
          var audio = new Audio(sound);
          audio.play();
          window.setTimeout(function () {
            self.loading = false;
            self.lastGenerated = exportFile;
          }, 1000);
        };
        self.$store.dispatch("exports/push", data);
      });
    },

    openLastGenerated: function () {
      window.open(
        "https://docs.google.com/presentation/d/" +
        this.lastGenerated.id +
        "/edit"
      );
      this.lastGenerated = null;
    },

    selectDatabase () {
      var self = this;
      this.$gapi.filePicker("SPREADSHEETS", function (database) {
        var payload = {
          project: self.project,
          database: {
            id: database.id,
            name: database.name,
          },
        };

        self.$store.dispatch("projects/addDatabase", payload);
      });
    },

    selectTemplate () {
      var self = this;

      this.$gapi.filePicker("PRESENTATIONS", function (template) {
        var payload = {
          project: self.project,
          template: {
            id: template.id,
            name: template.name,
          },
        };

        self.$store.dispatch("projects/addTemplate", payload);
      });
    },

    selectFolder () {
      var self = this;

      this.$gapi.filePicker("FOLDERS", function (folder) {
        var payload = {
          project: self.project,
          folderExport: {
            id: folder.id,
            name: folder.name,
          },
        };

        self.$store.dispatch("projects/addFolder", payload);
      });

    },
    removeProject () {
      this.$store.dispatch("projects/remove", this.project);
      this.$router.push("/");
    },
  },
  mounted () {
    this.$store.dispatch("exports/bind", this.$route.params.id);
  },
};
</script>

<style></style>
