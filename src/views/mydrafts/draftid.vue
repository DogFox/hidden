<template>
  <v-container>
    <v-card height="100%">
      <v-container>
        <v-card-title>
          {{ record.name }}
        </v-card-title>
        <template v-for="(member, i) in record.members">
          <v-card :key="i" class="mt-3" color="accent">
            <v-container pa-2>
              <v-row>
                <v-col cols="3">
                  <sphera-input v-model="member.name" readonly label="Имя учатсника" />
                </v-col>
                <v-col cols="3">
                  <sphera-input v-model="member.email" readonly label="Почта участника" />
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </template>
      </v-container>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    draftid: { type: [Number,String], default: null},
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