<template>
  <action-dialog v-model="record" v-bind="$attrs">
    <v-container>
      <v-row>
        <v-col>
          <sphera-input v-model="record.name" label="ФИО" hint="Введите имя клиента"></sphera-input>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <sphera-input v-model="record.addres" label="Адрес"></sphera-input>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="8">
          <sphera-input v-model="record.phone" label="Телефон" clearable></sphera-input>
        </v-col>
        <v-col cols="4">
          <sphera-input v-model="record.discount" label="Скидка" suffix="%" type="Number"></sphera-input>
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