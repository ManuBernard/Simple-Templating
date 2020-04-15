<template>
  <div>
    <feedback></feedback>
    <v-list dense>
      <v-list-item link @click="$router.push('/')">
        <v-list-item-action>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Projects</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link @click="$router.push('/newproject/')">
        <v-list-item-action>
          <v-icon>mdi-plus</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>New project</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider dark my-4></v-divider>
    <v-list dense>
      <v-list-item
        link
        v-for="(project, key) in projects"
        @click="select(project)"
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
    }
  },

  data() {
    return {};
  },

  methods: {
    select(project) {
      this.$router.push("/project/" + project.id);
      // this.$store.dispatch("projects/select", project);
    },

    newproject() {
      this.$router.push("/newproject/");
    }
  },
  created() {}
};
</script>
