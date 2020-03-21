<template>
  <div>
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

    PROJECTS LIST
    <v-list dense>
      <v-list-item>
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
          disabled: true,
          href: "/project/"
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
    remove() {
      this.$store.dispatch("projects/remove", this.project);
      this.$router.push("/projects/");
    },

    add() {
      this.$store.dispatch("projects/create", this.projectname);

      this.projectname = "";
    }
  },
  created() {}
};
</script>
