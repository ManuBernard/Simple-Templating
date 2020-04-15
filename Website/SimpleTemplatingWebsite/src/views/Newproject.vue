<template>
  <v-container fluid>
    <v-toolbar class="my-5" flat>
      <v-toolbar-title class="display-1">
        New project
      </v-toolbar-title>
    </v-toolbar>

    <v-form ref="form" v-model="valid" @submit.prevent="add">
      <div color="primary" class="text-center">
        <v-card max-width="500" flat>
          <v-card-text>
            <v-text-field
              outlined
              autofocus
              v-model="projectname"
              :counter="30"
              :rules="nameRules"
              label="Project name"
              required
            ></v-text-field>
          </v-card-text>
        </v-card>
      </div>

      <v-toolbar flat>
        <v-toolbar-title class="headline">
          Choose a template
        </v-toolbar-title>
      </v-toolbar>

      <v-row class="mx-2">
        <v-col
          sm="4"
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
            <v-card-text>{{ projectTemplate.description }}</v-card-text>
          </v-card>
        </v-col>
        <v-col sm="4">
          <v-card
            class="elevation-5 flex d-flex flex-column"
            :dark="'blank' == selectedProjectTemplate"
            :class="{ primary: 'blank' == selectedProjectTemplate }"
            @click="selectedProjectTemplate = 'blank'"
          >
            <v-card-title class="headline mb-1"> Blank project</v-card-title>
            <v-card-text
              >No files will be generated. Pick existing files from your
              Drive.</v-card-text
            >
          </v-card>
        </v-col>
      </v-row>

      <v-text-field
        style="display: none"
        v-model="selectedProjectTemplate"
        :rules="selectedProjectTemplateRules"
        required
      ></v-text-field>

      <v-toolbar class="mt-10" flat primary>
        <v-row>
          <v-col>
            <div v-if="selectedProjectTemplate == 'blank'">
              Starting from a blank project, you will have to choose an existing
              database, template, and export folder. No file nor folder will be
              created.
            </div>
            <div v-else>
              <div v-if="!folderRoot">
                By default, your project will be created at the root of your
                Drive.<br />
                <a color="primary" @click.prevent="selectFolder">
                  Change location
                </a>
              </div>
              <div v-else>
                Output folder : {{ folderRoot.root }}
                <a color="primary" @click.prevent="selectFolder">
                  Change folder
                </a>
              </div>
            </div>
          </v-col>
          <v-col class="text-right">
            <v-btn
              :disabled="!valid"
              color="primary"
              class="mr-4"
              x-large
              @click="add"
            >
              Create project
            </v-btn>
          </v-col>
        </v-row>
      </v-toolbar>
    </v-form>

    <v-overlay v-if="loading">
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
    }
  },

  data() {
    return {
      loading: false,
      projectname: null,

      folderRoot: null,

      selectedProjectTemplate: null,

      valid: true,
      name: "",
      selectedProjectTemplateRules: [v => !!v || "The input is required"],
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 30) || "Name must be less than 30 characters"
      ]
    };
  },

  mounted() {},

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
      var payload = {
        name: this.projectname,
        projectTemplate: this.selectedProjectTemplate
      };

      if (self.folderRoot) {
        payload.parent = self.folderRoot.id;
      }

      if (this.selectedProjectTemplate == "blank") {
        this.saveBlankProject();
      } else {
        this.$gapi.createNewProject(payload, function(data) {
          self.saveProject(data);
        });
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
        }
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
          id: projectId
        },
        callback: function() {
          self.redirect(projectId);
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
