<template>
  <v-container fluid>
    <template v-if="projects.length">
      <h1 class="display-2 mb-5">Your projects</h1>

      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="4"
          xl="3"
          v-for="project in projects"
          :key="project.id"
        >
          <v-card>
            <v-card-title
              class="secondary white--text text-center justify-center"
            >
              <h3 centered class="text-center my-5">{{ project.name }}</h3>
            </v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item>
                  <v-list-item-icon>
                    <v-img
                      contain
                      :src="require('../assets/sheets.png')"
                      max-width="32"
                    />
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      <template v-if="project.database">
                        {{ project.database.name }}
                      </template>
                      <template v-else>
                        No database
                      </template>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-icon>
                    <v-img
                      contain
                      :src="require('../assets/slides.png')"
                      max-width="32"
                    />
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      <template v-if="project.template">
                        {{ project.template.name }}
                      </template>
                      <template v-else>
                        No template
                      </template>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <div class="text-right"></div>
            </v-card-text>
            <v-card-actions
              color="grey"
              class="grey lighten-5 text-center py-5"
            >
              <v-row>
                <v-col>
                  <span class="body-2">Created on</span><br />
                  <span class="body-2">
                    {{ moment(project.created).format("MMM Do YYYY") }}</span
                  >
                </v-col>
                <v-col>
                  <v-btn
                    color="primary"
                    class="mx-auto"
                    @click="$router.push('/project/' + project.id)"
                    >Open</v-btn
                  >
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </template>
    <template v-else>
      <v-row class="mt-10 pt-10" justify="center" align="center">
        <v-col class="mx-auto text-center">
          <h1 class="display-2 mb-5">Create your first great project</h1>
          <v-btn large color="primary" @click="$router.push('newproject')">
            <v-icon class="mr-2">mdi-plus</v-icon>New project
          </v-btn>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script>
var moment = require("moment");

export default {
  computed: {
    projects() {
      return this.$store.getters["projects/projects"];
    },
  },

  data() {
    return {
      moment: moment,
    };
  },

  methods: {},
  created() {},
};
</script>
