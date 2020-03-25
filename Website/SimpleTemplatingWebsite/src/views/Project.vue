<template>
  <div v-if="project">
    <v-breadcrumbs
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
    </v-breadcrumbs>

    <v-container fluid>
      <h1 class="display-1">Project {{ project.name }}</h1>
      <button @click="readDatabase">Generate</button>
      <v-row>
        <v-col>
          <v-card>
            <h2>Database</h2>
            <div v-if="project.database">
              <h4>{{ project.database.name }}</h4>

              <a
                target="_blank"
                :href="'https://docs.google.com/spreadsheets/d/'+ project.database.id+'/edit'"
              >open</a>

              <button @click="removeDatabase">Remove</button>
            </div>
            <div v-else>
              <v-btn
                small
                color="primary"
                @click="selectDatabase"
              >Select</v-btn>
              <v-btn
                small
                color="secondary"
                @click="createDatabase"
              >Create new</v-btn>
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
    project () {
      return this.$store.getters["projects/byId"](this.$route.params.id);
    },
    projects () {
      return this.$store.getters["projects"];
    },
    breadcrumbsitems () {
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

  data () {
    return {
      projectname: null
    };
  },

  methods: {
    templatestuff (data) {
      var self = this;
      console.log(gapi.client.slides.presentations);


      gapi.client.slides.presentations.get({
        presentationId: self.project.template.id
      }).then(function (response) {
        console.log(response)

        var requests = [{
          duplicateObject: {
            objectId: response.result.slides[0].objectId
          }
        },
        {
          duplicateObject: {
            objectId: response.result.slides[0].objectId
          }
        },
        {
          duplicateObject: {
            objectId: response.result.slides[0].objectId
          }
        },
        {
          duplicateObject: {
            objectId: response.result.slides[0].objectId
          }
        },
        {
          duplicateObject: {
            objectId: response.result.slides[0].objectId
          }
        }];

        gapi.client.slides.presentations.batchUpdate({
          presentationId: self.project.template.id,
          requests: requests
        }).then((createSlideResponse) => {
          console.log(createSlideResponse)
        });
      });
    },
    readDatabase () {
      function getJsonArrayFromData (data) {
        var obj = {};
        var result = [];
        var headers = data[0];
        var cols = headers.length;
        var row = [];

        for (var i = 1, l = data.length; i < l; i++) {
          // get a row to fill the objectx
          row = data[i];
          // clear object
          obj = {};
          for (var col = 0; col < cols; col++) {
            // fill object with new values
            if (headers[col].substring(0, 1) == "#") {
              headers[col] = headers[col].toUpperCase();
            }
            obj[headers[col]] = row[col];
          }
          // add object in a final result
          result.push(obj);
        }

        return result;
      }

      var self = this;


      gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: self.project.database.id,
        range: "Database"

      }).then(function (response) {
        var data = getJsonArrayFromData(response.result.values);

        self.templatestuff(data);
      });
    },

    selectDatabase () {
      this.$gapi.filePicker("SPREADSHEETS", this.linkDatabaseToProject);
    },

    createDatabase () {
      var self = this;

      this.$gapi.createDb("name", function (database) {
        self.linkDatabaseToProject(database)
      });
    },

    linkDatabaseToProject (database) {
      console.log(database);
      var payload = {
        project: this.project,
        database: {
          id: database.id,
          name: database.name
        }
      };

      this.$store.dispatch("projects/addDatabase", payload);
    },
    removeDatabase () {
      this.$store.dispatch("projects/removeDatabase", {
        project: this.project
      });
    },
    selectTemplate () {
      var self = this;
      this.$gapi.filePicker("PRESENTATIONS", cb);

      function cb (data) {
        var payload = {
          project: self.project,
          template: data
        };

        self.$store.dispatch("projects/addTemplate", payload);
      }
    },
    removeTemplate () {
      this.$store.dispatch("projects/removeTemplate", {
        project: this.project
      });
    },
    selectFolder () {
      var self = this;
      this.$gapi.filePicker("FOLDERS", cb);

      function cb (data) {
        var payload = {
          project: self.project,
          folder: data
        };

        self.$store.dispatch("projects/addFolder", payload);
      }
    },
    removeFolder () {
      this.$store.dispatch("projects/removeFolder", {
        project: this.project
      });
    },
    showDetails (data) {
      if (data.picked === "picked") {
        console.log(data.docs);
      }
    },
    remove () {
      this.$store.dispatch("projects/remove", this.project);
      this.$router.push("/projects/");
    },

    add () {
      this.$store.dispatch("projects/create", this.projectname);

      this.projectname = "";
    }
  },
  created () {

  }
};
</script>
