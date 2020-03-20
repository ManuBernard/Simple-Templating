<template>
  <div class="projectEditor">
    SELECTED :
    <div v-if="!editing">
      {{ project.name }}
      <a @click.prevent="startEditing"><v-icon name="regular/edit"/></a>
    </div>
    <form v-else @submit.prevent="update">
      <input v-model="newname" />
      <input type="submit" />
      <a @click.prevent="stopEditing">Cancel</a>
    </form>
    <button @click="remove">delete</button>
  </div>
</template>

<script>
export default {
  props: {
    project: {}
  },

  computed: {},

  data() {
    return {
      editing: false,
      newname: null
    };
  },

  methods: {
    startEditing() {
      this.editing = true;
      this.newname = this.project.name;
    },
    stopEditing() {
      this.editing = false;
    },
    remove(project) {
      this.$store.dispatch("projects/remove", this.project);
      this.$store.dispatch("projects/select", null);
    },
    update() {
      const payload = {
        id: this.project.id,
        name: this.newname
      };
      this.$store.dispatch("projects/update", payload);
      this.editing = false;
    }
  },
  created() {}
};
</script>
