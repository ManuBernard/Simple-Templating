<template>
  <div>
    <feedback></feedback>
    <v-list dense>
      <v-list-item link :to="'/'">
        <v-list-item-action>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Projects</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link :to="'/newproject/'">
        <v-list-item-action>
          <v-icon>mdi-plus</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>New project </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider dark my-4></v-divider>
    <v-list dense>
      <v-list-item
        link
        v-for="(project, key) in projects"
        :to="'/project/' + project.id"
        v-bind:key="key"
      >
        <v-list-item-action>
          <v-icon>mdi-clipboard</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ project.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
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
  },

  data() {
    return {};
  },

  methods: {},
  created() {},
};
</script>
