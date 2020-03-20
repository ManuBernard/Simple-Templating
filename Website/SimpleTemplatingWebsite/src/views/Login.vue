<template>
  <div class="login">
    <div v-if="!user">
      <button @click="login">login</button>
    </div>
    <div v-else>
      {{user.displayName}}
      <button @click="logout">logout</button>
    </div>
  </div>
</template>

<script>

export default {
  computed: {
    user () {
      return this.$store.getters['user/user']
    }
  },
  methods: {
    login () {
      this.$store.dispatch('user/login');
    },
    logout () {
      this.$store.dispatch('user/logout');
    }
  }
};
</script>
