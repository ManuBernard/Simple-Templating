<template>
  <div v-if="project">
    <!-- <v-breadcrumbs
  :items="breadcrumbsitems"
  divider="/"
>
  <template v-slot:item="{ item }">
    <v-breadcrumbs-item
      @click.prevent="$router.push(item.href)"
      :disabled="item.disabled"
    >
      {{ item.text.toUpperCase() }}
    </v-breadcrumbs-item>
  </template>
</v-breadcrumbs> -->

    <v-container fluid>
      <v-toolbar flat>
        <v-toolbar-title class="headline">
          <span class="font-weight-thin">The</span> {{ project.name }}
          <span class="font-weight-thin">project</span>

          <v-btn icon class="ml-1" color="secondary" @click.stop="showRenamer">
            <v-icon>mdi-pencil-outline</v-icon>
          </v-btn>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          target="_blank"
          color="secondary"
          outlined
          href="http://simpletemplating.com/documentation/"
        >
          Documentation <v-icon class="ml-2">mdi-help-circle-outline</v-icon>
        </v-btn>
      </v-toolbar>
      <v-row>
        <v-col>
          <v-card class="px-4 py-4">
            <v-card-title class="justify-center">
              <a
                target="_blank"
                :href="
                  'https://docs.google.com/spreadsheets/d/' +
                    project.database.id +
                    '/edit'
                "
              >
                <v-img
                  contain
                  :src="require('../assets/sheets.png')"
                  max-width="128"
                />
              </a>
            </v-card-title>

            <v-card-title class="headline justify-center">
              <v-btn
                outlined
                target="_blank"
                color="primary"
                :href="
                  'https://docs.google.com/spreadsheets/d/' +
                    project.database.id +
                    '/edit'
                "
                >{{ project.database.name }}</v-btn
              >
            </v-card-title>

            <v-card-actions class="justify-center">
              <v-spacer></v-spacer>
              <v-btn text color="secondary" @click="selectDatabase"
                >Change file</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col>
          <v-card class="px-4 py-4">
            <v-card-title class="justify-center">
              <a
                target="_blank"
                :href="
                  'https://docs.google.com/presentation/d/' +
                    project.template.id +
                    '/edit'
                "
              >
                <v-img
                  contain
                  :src="require('../assets/slides.png')"
                  max-width="128"
                />
              </a>
            </v-card-title>

            <v-card-title class="headline justify-center">
              <v-btn
                outlined
                target="_blank"
                color="primary"
                :href="
                  'https://docs.google.com/presentation/d/' +
                    project.template.id +
                    '/edit'
                "
                >{{ project.template.name }}</v-btn
              >
            </v-card-title>

            <v-card-actions class="justify-center">
              <v-spacer></v-spacer>
              <v-btn text color="secondary" @click="selectTemplate"
                >Change file
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <v-toolbar class="my-2" flat>
        <v-row align="center" justify="center">
          <v-col></v-col>
          <v-col class="text-center">
            <v-btn x-large color="primary" @click="templetify"
              >Run templating <v-icon class="ml-2">mdi-auto-fix</v-icon>
            </v-btn>
          </v-col>
          <v-col class="text-right">
            <v-btn
              outlined
              color="primary"
              target="_blank"
              class="mr-1 ml-2"
              :href="
                'https://docs.google.com/drive/u/0/folders/' + project.folder.id
              "
              >Output: {{ project.folder.name }}</v-btn
            >
            <v-btn icon color="secondary" @click="selectFolder">
              <v-icon>mdi-settings</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-toolbar>

      <v-data-table
        :headers="headers"
        :items="formatedExports"
        :items-per-page="5"
        class="elevation-1"
      >
        <template v-slot:item.link="{ item }">
          <v-btn outlined target="_blank" color="primary" :href="item.link"
            >View
          </v-btn>
        </template></v-data-table
      >
      <v-toolbar flat>
        <v-spacer></v-spacer>
        <div v-if="!remove">
          <v-btn outlined tile color="error" @click="remove = true">
            Remove project
          </v-btn>
        </div>
        <div v-else>
          <v-btn
            outlined
            tile
            color="secondary"
            class="mr-4"
            @click="remove = false"
          >
            Cancel
          </v-btn>
          <v-btn outlined tile color="error" @click="removeProject">
            Confirm remove project
          </v-btn>
        </div>
      </v-toolbar>
    </v-container>
    <v-overlay v-if="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <v-overlay
      color="primary"
      opacity="0.8"
      class="text-center"
      v-if="lastGenerated"
    >
      <v-icon class="display-4 mb-10">mdi-thumb-up-outline</v-icon>

      <h2 class="display-1 font-weight-bold  mb-10">
        {{ lastGenerated.name }} has been freshly generated
      </h2>

      <v-btn @click="openLastGenerated" x-large class="mr-4">
        Open it
      </v-btn>
      <v-btn @click="lastGenerated = null" fab text x-large>
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-overlay>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Rename project
        </v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="valid" @submit.prevent="savename">
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
              @click="savename"
            >
              Submit
            </v-btn>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" text @click="dialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  computed: {
    project() {
      return this.$store.getters["projects/byId"](this.$route.params.id);
    },

    exports() {
      return this.$store.getters["exports/exports"];
    },
    formatedExports() {
      var ret = [];
      // const options = {
      //   weekday: "long",
      //   year: "numeric",
      //   month: "long",
      //   day: "numeric"
      // };

      // .toLocaleDateString('en-US', options)

      this.exports.forEach(exp => {
        ret.push({
          name: exp.name,
          created: exp.created,
          link: "https://docs.google.com/presentation/d/" + exp.id + "/edit"
        });
      });
      return ret;
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
      remove: false,
      loading: false,
      lastGenerated: null,
      projectname: null,
      dialog: false,
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 30) || "Name must be less than 30 characters"
      ],
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: true,
          value: "name"
        },
        { text: "Created", value: "created" },
        { text: "Link", value: "link" }
      ]
    };
  },

  methods: {
    showRenamer() {
      this.dialog = true;
      this.projectname = this.project.name;
    },
    savename() {
      this.dialog = false;
      this.$store.dispatch("projects/update", {
        id: this.project.id,
        name: this.projectname
      });
    },
    templetify() {
      var self = this;
      this.loading = true;

      this.$gapi.templetify(this.project, self.exports.length + 1, function(
        data
      ) {
        data.project = self.project;
        data.callback = function(exportFile) {
          var sound = require("../assets/success.mp3");
          var audio = new Audio(sound);
          audio.play();
          window.setTimeout(function() {
            self.loading = false;
            self.lastGenerated = exportFile;
          }, 1000);
        };
        self.$store.dispatch("exports/push", data);
      });
    },

    openLastGenerated: function() {
      window.open(
        "https://docs.google.com/presentation/d/" +
          this.lastGenerated.id +
          "/edit"
      );
      this.lastGenerated = null;
    },

    selectDatabase() {
      this.$gapi.filePicker("SPREADSHEETS", function(database) {
        var payload = {
          project: this.project,
          database: {
            id: database.id,
            name: database.name
          }
        };

        this.$store.dispatch("projects/addDatabase", payload);
      });
    },

    selectTemplate() {
      var self = this;
      this.$gapi.filePicker("PRESENTATIONS", cb);

      function cb(data) {
        var payload = {
          project: self.project,
          template: data
        };

        self.$store.dispatch("projects/addTemplate", payload);
      }
    },

    selectFolder() {
      var self = this;
      this.$gapi.filePicker("FOLDERS", cb);

      function cb(data) {
        var payload = {
          project: self.project,
          folder: data
        };

        self.$store.dispatch("projects/addFolder", payload);
      }
    },
    removeProject() {
      this.$store.dispatch("projects/remove", this.project);
      this.$router.push("/projects/");
    }
  },
  mounted() {
    this.$store.dispatch("exports/bind", this.$route.params.id);
  }
};
</script>
<style>
.list-item {
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
