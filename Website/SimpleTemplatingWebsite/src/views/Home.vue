<template>
  <v-row>
    <v-col cols="3">
      <v-list dense>
        <v-list-item
          link
          v-for="(project, key) in projects"
          @click="select(project)"
          v-bind:key="key"
        >
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>aa{{ project.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-col>
    <v-col> </v-col>
  </v-row>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters["user/user"];
    },
    projects() {
      return this.$store.getters["projects/projects"];
    },
    currentProject() {
      return this.$store.getters["projects/current"];
    }
  },

  data() {
    return {
      projectname: null
    };
  },

  methods: {
    select(project) {
      this.$store.dispatch("projects/select", project);
    },

    add() {
      this.$store.dispatch("projects/create", this.projectname);

      this.projectname = "";
    }
  },
  created() {}
};
</script>
