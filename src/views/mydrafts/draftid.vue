<template>
    <v-container>
  <v-card height="100%" class="opacity-color">
      <v-row class="justify-center" no-gutters>
        <v-col sm="12" md="8">
          <v-card-title class="text-center justify-center christmass-color">
            <h1 class="font-weight-bold ">
              {{ record.name }}
            </h1>
          </v-card-title>
        </v-col>
      </v-row>
      <v-row class="justify-center" no-gutters>
        <v-col sm="12" md="8">
          <v-card-subtitle class="text-center justify-center py-2 ">
            <h3 class="christmass-color">
              {{ record.description }}
            </h3>
          </v-card-subtitle>
        </v-col>
      </v-row>
      <template v-if="admin">
        <v-tabs v-model="tab" background-color="transparent" centered>
          <v-tab>Основная</v-tab>
          <v-tab>Участники</v-tab>
          <v-tab>Настройки</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <common-tab v-model="record" :draftid="draftid" />
          </v-tab-item>
          <v-tab-item>
            <members-tab v-model="record" :draftid="draftid" @swop="fetchData()" />
          </v-tab-item>
          <v-tab-item>
            <settings-tab v-model="record" :draftid="draftid" />
          </v-tab-item>
        </v-tabs-items>
      </template>
      <template v-else>
        <common-tab v-model="record" :draftid="draftid" />
      </template>
  </v-card>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import CommonTab from './tabs/CommonTab.vue';
import MembersTab from './tabs/MembersTab.vue';
import SettingsTab from './tabs/SettingsTab.vue';

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
  components: { CommonTab, MembersTab, SettingsTab },
  props: {
    draftid: { type: [Number, String], default: null },
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
      this.record.memberships.forEach(membership => {
        arr.push({ id: membership.id, member: membership.member });
      });
      return arr;
    },
  },
  methods: {
    async fetchData() {
      const result = await this.http.get('draftpermission/' + this.draftid);
      if (result && result.admin) {
        this.admin = result.admin;
      }
      this.record = await this.http.get('draft/' + this.draftid, result);
    },
  },
});
</script>

<style scoped>
.opacity-color {
  background-color: rgba(255, 255, 255, 0.8);
}
.theme--light.v-tabs-items {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 0.5rem;
}
</style>