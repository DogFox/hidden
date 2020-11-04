<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="6">
        <sphera-input v-model="record.name" label="Название" @change="onChangeBox()" />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="6">
        <sphera-textarea v-model="record.description" rows="3" label="Установленное ограничение" @change="onChangeBox()" />
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="3">
        <v-checkbox v-model="record.limit" class="py-0 my-0" label="Ограничение бюджета" @change="onChangeBox()" />
      </v-col>
      <v-col cols="3">
        <sphera-input v-model="record.limitValue" label="Установленное ограничение" @change="onChangeBox()" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  model: { prop: 'record', event: 'change' },
  props: {
    record: { type: Object, required: true },
    draftid: { type: [Number, String], required: true },
  },
  data() {
    return {
      http: new this.$http(),
    };
  },
  computed: {
    member(): any {
      if (this.record && this.record.santas && this.record.santas[0]) {
        return this.record.santas[0];
      }
      return {};
    },
  },
  methods: {
    async onChangeBox() {
      await this.http.put('draft/part_update/' + this.draftid, {
        limit: this.record.limit,
        limitValue: this.record.limitValue,
        name: this.record.name,
        description: this.record.description,
      });
    },
    async onChangeWishes() {
      await this.http.put('member/part_update/' + this.member.santa, { wishes: this.member.santa_wishes });
    },
  },
});
</script>