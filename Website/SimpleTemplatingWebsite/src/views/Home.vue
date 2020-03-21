<template>
  <div></div>
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
