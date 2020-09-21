<template>
  <v-menu transition="scale-transition" offset-y v-model="menu" :open-on-click="false">
    <template v-slot:activator="data">
      <v-text-field v-model="dateText" :label="label" prepend-icon="mdi-calendar" v-on="data.on" @click:prepend="menu = true"></v-text-field>
    </template>
    <template v-slot:default>
      <v-date-picker no-title :value="datePicker" :first-day-of-week="1" no-title scrollable @input="onPickDate($event)" width="290" locale="ru-ru"></v-date-picker>
    </template>
  </v-menu>
</template>
<script lang="ts">
import Vue from 'vue';
import { format } from 'date-fns';
import ru from 'date-fns/locale/ru';

export default Vue.extend({
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    label: { type: String, default: 'Дата' },
    value: { type: [String], default: null },
  },
  data() {
    return {
      menu: false,
    };
  },
  computed: {
    dateText(): string | null {
      if (!this.value) {
        return null;
      }
      const val: Date = typeof this.value === 'string' ? new Date(this.value) : this.value;
      return format(val, 'dd.MM.yyyy');
    },
    datePicker(): string | null {
      if (!this.value) {
        return null;
      }
      const val: Date = typeof this.value === 'string' ? new Date(this.value) : this.value;
      console.log(val);

      const dateISO = format(val, 'dd-MM-yyyy') + `'T'00:00:00`;
      console.log(dateISO);

      return null;
    },
  },
  methods: {
    onPickDate(payload: any) {
      this.$emit('change', this.dateToIso(payload));
    },
    dateToIso(date: string) {
      return date + `'T'00:00:00`;
    },
  },
});
</script>