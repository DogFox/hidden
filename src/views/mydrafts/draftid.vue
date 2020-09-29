<template>
  <v-container>
    <v-card-title>
      {{ record.name }}
    </v-card-title>
    <template v-for="(member, i) in record.members">
      <v-card :key="i" class="mt-3">
        <v-container>
          <v-row>
            <v-col cols="3">
              <v-card-subtitle>
                {{ member.name }}
              </v-card-subtitle>
            </v-col>
            <v-col cols="3">
              <v-card-subtitle>
                {{ member.email }}
              </v-card-subtitle>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </template>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    draftid: { type: Number, default: null},
  },
  data() {
    return {
      record: {},
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.record = await new this.$http().get('draft/' + this.draftid);
    },
  },
});
</script>