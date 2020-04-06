<template>
  <v-container fluid>

    <template v-if="projects.length">

      <v-toolbar flat>
        <v-toolbar-title class="font-weight-thin headline">Your projects</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          large
          color="primary"
          @click="$router.push('newproject')"
        >
          <v-icon class="mr-2">mdi-plus</v-icon>New project
        </v-btn>
      </v-toolbar>

      <v-row>
        <v-col
          cols="12"
          sm="4"
          v-for="project in projects"
          :key="project.id"
        >
          <v-card>
            <v-responsive :aspect-ratio="16/9">
              <v-card-title>
                {{ project.name }}
              </v-card-title>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  @click="$router.push('/project/' + project.id)"
                >Open</v-btn>
              </v-card-actions>
            </v-responsive>
          </v-card>
        </v-col>
      </v-row>

    </template>
    <template v-else>

      <v-row
        class="mt-10 pt-10"
        justify="center"
        align="center"
      >
        <v-col class="mx-auto text-center">
          <h1 class="display-2 mb-5">Create your first great project</h1>
          <v-btn
            large
            color="primary"
            @click="$router.push('newproject')"
          >
            <v-icon class="mr-2">mdi-plus</v-icon>New project
          </v-btn>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script>
export default {
  computed: {
    projects () {
      return this.$store.getters["projects/projects"];
    }
  },

  data () {
    return {};
  },

  methods: {},
  created () { }
};
</script>
