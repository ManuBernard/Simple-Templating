<template>
  <div class="fill-height" fluid>
    <template v-if="projects.length">
      <v-container fluid>
        <v-toolbar flat>
          <v-toolbar-title class="headline"
            >All your great projects</v-toolbar-title
          >
          <v-spacer></v-spacer>
          <v-btn large color="primary" @click="$router.push('newproject')"
            ><v-icon class="mr-2">mdi-plus</v-icon>New project</v-btn
          >
        </v-toolbar>

        <v-row>
          <v-col cols="12" sm="4" v-for="project in projects" :key="project.id">
            <v-card>
              <v-card-title>
                {{ project.name }}
              </v-card-title>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  @click="$router.push('/project/' + project.id)"
                  >Open</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
    <template v-else>
      <v-container class="fill-height" fluid>
        <v-row justify="center" align="center">
          <v-col class="mx-auto text-center">
            <h1 class="display-2 mb-5">Create your first great project</h1>
            <v-btn large color="primary" @click="$router.push('newproject')"
              ><v-icon class="mr-2">mdi-plus</v-icon>New project</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </template>
  </div>
</template>

<script>
export default {
  computed: {
    projects() {
      return this.$store.getters["projects/projects"];
    }
  },

  data() {
    return {};
  },

  methods: {},
  created() {}
};
</script>
