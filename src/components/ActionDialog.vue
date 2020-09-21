<template>
  <v-dialog v-model="dial" max-width="500px" v-bind="$attrs" :persistent="!noPersistent">
    <v-toolbar dark color="primary">
      <v-btn v-if="!noCancel" icon dark @click="onCancel($event)">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>{{ header }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items> </v-toolbar-items>
    </v-toolbar>
    <v-card>
      <v-card-text>
        <slot></slot>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-if="!noCancel" color="blue darken-1" text @click="onCancel($event)">{{ cancelBtnTitle }}</v-btn>
        <v-btn color="blue darken-1" text @click="onSave($event)">{{ saveBtnTitle }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ActionDialog',
  model: { prop: 'record', event: 'change' },
  props: {
    header: { type: String, default: '' },
    saveBtnTitle: { type: String, default: 'Сохранить' },
    cancelBtnTitle: { type: String, default: 'Отмена' },
    noCancel: { type: Boolean, default: false },
    noPersistent: { type: Boolean, default: false },
  },
  data() {
    return {
      dial: false,
    };
  },
  mounted() {
    this.dial = true;
  },
  methods: {
    onCancel(payload: any) {
      if (this.$attrs.slotEmit) {
        // @ts-ignore
        this.$attrs.slotEmit('close', payload);
      } else {
        this.$emit('close', payload);
      }
    },
    onSave(payload: any) {
      if (this.$attrs.slotEmit) {
        // @ts-ignore
        this.$attrs.slotEmit('save', payload);
      } else {
        this.$emit('save', payload);
      }
    },
  },
});
</script>