<template>
  <div>
    <v-list dense>
      <v-list-item link>
        <v-list-item-action>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link>
        <v-list-item-action>
          <v-icon>mdi-settings</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Settings</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-list dense>
      <v-list-item >
        <v-btn small color="primary" @click="newproject">New project</v-btn>
      </v-list-item>
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
        return{}
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
</template>
