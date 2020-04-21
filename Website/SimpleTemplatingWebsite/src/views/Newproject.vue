<template>
  <v-container fluid>
    <h1 class="display-2 mb-5">New project</h1>

    <v-form ref="form" v-model="valid" @submit.prevent="add">
      <v-card dark color="secondary darken-5" flat>
        <v-card-text class="py-5 px-5 py-md-10 px-md-10">
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                outlined
                color="backgroud-white"
                autofocus
                v-model="projectname"
                :counter="30"
                :rules="nameRules"
                label="Project name"
                required
              ></v-text-field>
            </v-col>
            <v-col class="pt-0 pb-10 pt-sm-2 pb-sm-2">
              <div
                v-if="
                  selectedProjectTemplate &&
                    selectedProjectTemplate.database_id == 'blank'
                "
              >
                Starting from a blank project, you will have to choose an
                existing database, template, and export folder. No file nor
                folder will be created.
              </div>
              <div v-else>
                <div v-if="!folderRoot">
                  Project will be created at your Drive's root.<br />
                  <a color="primary" @click.prevent="selectFolder">
                    Change location
                  </a>
                </div>
                <div v-else>
                  Output folder : {{ folderRoot.name }}
                  <a color="primary" @click.prevent="selectFolder">
                    Change folder
                  </a>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <v-card flat color="transparent" class="text-center mt-n6 ">
        <v-btn
          color="primary text-center center elevation-10"
          x-large
          rounded
          type="submit"
          :disabled="!valid"
          >Create project <v-icon class="ml-2">mdi-plus</v-icon>
        </v-btn>
      </v-card>

      <h2 class="display-1 my-5">Choose a seed project</h2>

      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          xl="2"
          v-for="projectTemplate in projectTemplates"
          :key="projectTemplate.name"
          class="pa-3 d-flex flex-column"
        >
          <v-card
            class="elevation-5 flex d-flex flex-column"
            :dark="projectTemplate == selectedProjectTemplate"
            :class="{ primary: projectTemplate == selectedProjectTemplate }"
            @click="selectedProjectTemplate = projectTemplate"
          >
            <v-card-title class="headline mb-1">
              {{ projectTemplate.name }}</v-card-title
            >
            <v-card-text class="subtitle-1">{{
              projectTemplate.description
            }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-text-field
        style="display: none"
        v-model="selectedProjectTemplate"
        :rules="selectedProjectTemplateRules"
        required
      ></v-text-field>
    </v-form>

    <v-overlay primary opacity="0.8" v-if="loading" z-index="9999">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {
  computed: {
    projectTemplates: function() {
      return this.$store.getters["config/templates"];
    },
  },

  data() {
    return {
      loading: false,
      projectname: null,

      folderRoot: null,

      selectedProjectTemplate: null,

      valid: true,
      name: "",
      selectedProjectTemplateRules: [(v) => !!v || "The input is required"],
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 30) || "Name must be less than 30 characters",
      ],
    };
  },

  mounted() {
    var self = this;
    window.setTimeout(function() {
      self.selectedProjectTemplate = self.projectTemplates[0];
    }, 100);
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
      if (!self.loading) {
        self.loading = true;
        var payload = {
          name: this.projectname,
          projectTemplate: this.selectedProjectTemplate,
        };

        if (self.folderRoot) {
          payload.parent = self.folderRoot;
        }

        if (this.selectedProjectTemplate.database_id == "blank") {
          this.saveBlankProject();
        } else {
          this.$gapi.newProject(payload, function(data) {
            self.saveProject(data);
          });
        }
      }
    },

    saveProject(data) {
      const self = this;
      const payload = {
        name: self.projectname,
        database: data.database,
        template: data.template,
        folderExport: data.folderExport,
        project: data.folderRoot,
        callback: function() {
          self.redirect(data.folderRoot.id);
        },
      };

      this.$store.dispatch("projects/create", payload);
    },

    saveBlankProject() {
      const self = this;
      const projectId = uuidv4();
      const payload = {
        name: this.projectname,
        database: null,
        template: null,
        folderExport: null,
        project: {
          id: projectId,
        },
        callback: function() {
          self.redirect(projectId);
        },
      };

      this.$store.dispatch("projects/create", payload);
    },

    redirect(id) {
      this.projectname = "";
      this.$router.push("/project/" + id);
    },
  },
};
</script>
