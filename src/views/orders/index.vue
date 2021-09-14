<template>
  <div class="client">
    <sphera-table :headers="headers" :path="path" :description="description">
      <template v-slot:modal="props">
        <order-modal v-model="props.item" v-bind="props" />
      </template>
    </sphera-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import OrderModal from './OrderModal.vue';
import { order } from './orders';

export default Vue.extend({
  name: 'Orders',
  components: { OrderModal },
  data() {
    return {
      path: order.path,
      headers: order.fields,
      description: order.description,
    };
  },
});
</script>
