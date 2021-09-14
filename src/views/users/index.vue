<template>
  <div class="client">
    <sphera-table :headers="headers" :path="path" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { user } from './users';

export default Vue.extend({
  name: 'Users',
  data() {
    return {
      path: user.path,
      headers: user.fields,
    };
  },
});
</script>
