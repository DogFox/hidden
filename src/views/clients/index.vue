<template>
  <div class="client">
    <sphera-table :headers="headers" :path="path" description="Покупатели">
      <template v-slot:modal="props">
        <client-modal v-model="props.item" v-bind="props" />
      </template>
    </sphera-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ClientModal from './ClientModal.vue';
import { client } from './clients';

export default Vue.extend({
  name: 'Clients',
  components: { ClientModal },
  data() {
    return {
      path: client.path,
      headers: client.fields,
    };
  },
});
</script>
