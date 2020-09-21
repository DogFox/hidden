<template>
  <v-card>
    <v-container>
      <v-row>
        <v-col>
          <v-text-field v-model="record.email" label="Email"></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field v-model="record.email" label="Возраст"></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Accounts',
  data() {
    return {
      record: {},
    };
  },
  async created() {
    const result = await new this.$http().get('users/1');
  },
});
</script>
