<template>
  <v-toolbar dense dark color="primary" flat>
    <v-toolbar-title>{{ description }}</v-toolbar-title>
    <v-spacer />
    <v-btn color="white" icon @click="$emit('click')">
      <v-icon>
        add
      </v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TableToolbar',
  props: {
    description: { type: String, default: '' },
  },
});
</script>