<template>
  <action-dialog v-model="record" v-bind="$attrs">
    <v-container>
      <v-row>
        <v-col cols="3">
          <v-text-field v-model="record.number" label="Номер заказа" />
        </v-col>
        <v-col>
          <v-text-field v-model="record.status" label="Статус заказа" disabled />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="record.summ" label="Сумма" disabled />
        </v-col>
        <v-col>
          <v-text-field v-model="record.count" label="Количество позиций" disabled />
        </v-col>
        <v-col>
          <v-date-field v-model="record.date" label="Дата формирования" disabled />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="record.customer_id" label="Покупатель" disabled />
        </v-col>
      </v-row>
    </v-container>
  </action-dialog>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ClientModal',
  model: { prop: 'record', event: 'change' },
  props: {
    record: { type: Object, required: true },
  },
});
</script>