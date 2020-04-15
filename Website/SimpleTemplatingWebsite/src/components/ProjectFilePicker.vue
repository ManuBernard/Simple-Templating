<template>
  <v-card class="flex d-flex flex-column px-4 py-4">
    <template v-if="file">
      <v-card-title class="justify-center">
        <a target="_blank" :href="url">
          <v-img
            contain
            :src="require('../assets/' + icon + '.png')"
            max-width="128"
          />
        </a>
      </v-card-title>

      <v-card-title class="headline justify-center">
        <v-btn outlined target="_blank" color="primary" :href="url">
          {{ file.name }}
        </v-btn>
      </v-card-title>

      <v-card-actions class="justify-center">
        <v-spacer></v-spacer>
        <v-btn text color="secondary" @click="$emit('select')"
          >Change file
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </template>
    <template v-else>
      <v-card-title class="justify-center">
        <v-img
          contain
          style="opacity: 0.2"
          :src="require('../assets/' + icon + '.png')"
          max-width="128"
        />
      </v-card-title>
      <v-card-actions class="justify-center">
        <v-btn color="primary" @click="$emit('select')">Select file </v-btn>
      </v-card-actions>
    </template>
  </v-card>
</template>

<script>
export default {
  props: {
    type: {
      required: true
    },
    file: {
      required: true
    }
  },
  computed: {
    url() {
      let url;
      if (this.type == "template") {
        url =
          "https://docs.google.com/presentation/d/" + this.file.id + "/edit";
      } else {
        url =
          "https://docs.google.com/spreadsheets/d/" + this.file.id + "/edit";
      }
      return url;
    },
    icon() {
      let icon;
      if (this.type == "template") {
        icon = "slides";
      } else {
        icon = "sheets";
      }
      return icon;
    }
  }
};
</script>
