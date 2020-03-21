<template>
  <div v-if="project">
    <v-breadcrumbs :items="breadcrumbsitems" divider="/">
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item
          @click.prevent="$router.push(item.href)"
          :disabled="item.disabled"
        >
          {{ item.text.toUpperCase() }}
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>

    <v-container fluid>
      <h1 class="display-1">Project {{ project.name }}</h1>

      <v-row>
        <v-col>
          <v-card>
            <h2>Database</h2>
            <div v-if="project.database">
              <h4>{{ project.database.name }}</h4>

              <button @click="removeDatabase">Remove</button>
            </div>
            <div v-else>
              <v-btn small color="primary" @click="selectDatabase"
                >Select</v-btn
              >
            </div>
          </v-card>
        </v-col>

        <v-col>
          <v-card>
            <h2>Template</h2>
            <div v-if="project.template">
              <h4>{{ project.template.name }}</h4>
              <button @click="removeTemplate">Remove</button>
            </div>
            <div v-else>
              <button @click="selectTemplate">Select</button>
            </div>
          </v-card>
        </v-col>

        <v-col>
          <v-card>
            <h2>Folder</h2>
            <div v-if="project.folder">
              <h4>{{ project.folder.name }}</h4>
              <button @click="removeFolder">Remove</button>
            </div>
            <div v-else>
              <button @click="selectFolder">Select</button>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <button @click="remove">Remove</button>
    </v-container>
  </div>
</template>

<script>
export default {
  computed: {
    project() {
      return this.$store.getters["projects/byId"](this.$route.params.id);
    },
    projects() {
      return this.$store.getters["projects"];
    },
    breadcrumbsitems() {
      return [
        {
          text: "Dashboard",
          disabled: false,
          href: "/dashboard/"
        },
        {
          text: "Projects",
          disabled: false,
          href: "/projects/"
        },
        {
          text: this.project.name,
          disabled: true,
          href: "/project/" + this.project.id
        }
      ];
    }
  },

  data() {
    return {
      projectname: null
    };
  },

  methods: {
    selectDatabase() {
      var self = this;
      this.$googleFilePicker("SPREADSHEETS", cb);

      function cb(data) {
        var payload = {
          project: self.project,
          database: data
        };

        self.$store.dispatch("projects/addDatabase", payload);
      }
    },
    removeDatabase() {
      this.$store.dispatch("projects/removeDatabase", {
        project: this.project
      });
    },
    selectTemplate() {
      var self = this;
      this.$googleFilePicker("PRESENTATIONS", cb);

      function cb(data) {
        var payload = {
          project: self.project,
          template: data
        };

        self.$store.dispatch("projects/addTemplate", payload);
      }
    },
    removeTemplate() {
      this.$store.dispatch("projects/removeTemplate", {
        project: this.project
      });
    },
    selectFolder() {
      var self = this;
      this.$googleFilePicker("FOLDERS", cb);

      function cb(data) {
        var payload = {
          project: self.project,
          folder: data
        };

        self.$store.dispatch("projects/addFolder", payload);
      }
    },
    removeFolder() {
      this.$store.dispatch("projects/removeFolder", {
        project: this.project
      });
    },
    showDetails(data) {
      if (data.picked === "picked") {
        console.log(data.docs);
      }
    },
    remove() {
      this.$store.dispatch("projects/remove", this.project);
      this.$router.push("/projects/");
    },

    add() {
      this.$store.dispatch("projects/create", this.projectname);

      this.projectname = "";
    }
  },
  created() {
    console.log(this.$gapi);
    let gDrive = document.createElement("script");
    gDrive.setAttribute("type", "text/javascript");
    gDrive.setAttribute("src", "https://apis.google.com/js/api.js");
    document.head.appendChild(gDrive);
  }
};
</script>
