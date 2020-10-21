<template>
  <v-container>
    <v-card>
      <v-card-title class="text-center justify-center">
        <h1 class="font-weight-bold ">
          {{ record.name }}
        </h1>
      </v-card-title>
      <v-card-subtitle class="text-center justify-center py-2">
        {{ record.description }}
      </v-card-subtitle>
      <template v-if="admin">
        <v-tabs
          v-model="tab" 
          centered
        >
          <v-tab>Основная</v-tab>
          <v-tab>Участники</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <common-tab v-model="record" :draftid="draftid" :admin="admin" />
          </v-tab-item>
          <v-tab-item>
            <members-tab v-model="record" :draftid="draftid" :admin="admin" @swop="fetchData()" />
          </v-tab-item>
        </v-tabs-items>
      </template>
      <template v-else>
        <common-tab v-model="record" :draftid="draftid" :admin="admin" />
      </template>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import CommonTab from './CommonTab.vue';
import MembersTab from './MembersTab.vue';

interface SecretBox {
  id: number;
  admin: number;
  limit: boolean;
  limitValue: number;
  description: string;
  memberships: Array<any>;
  santas: any[];
}

export default Vue.extend({
  components: { CommonTab, MembersTab },
  props: {
    draftid: { type: [Number,String], default: null},
  },
  data() {
    return {
      tab: null,
      record: {} as SecretBox,
      http: new this.$http(),
      showPairs: false,
      admin: false,
    };
  },
  created() {
    this.fetchData();
  },
  computed: {
    showBtnLabel(): string {
      return this.showPairs ? 'Скрыть пары' : 'Показать пары';
    },
    members(): any[] {
      const arr = [] as any;
      this.record.memberships.forEach( membership => {
        arr.push({id: membership.id, member: membership.member});
      });
      return arr;
    },
  },
  methods: {
    async fetchData() {
      const result = await this.http.get('draftpermission/' + this.draftid);
      if( result && result.admin ) {
        this.admin = result.admin;
      }
      this.record = await this.http.get('draft/' + this.draftid, result);
    },
  },
});
</script>