<template>
  <v-container>
    <v-row>
      <v-col />
      <v-col>
        <sphera-action-btn @click="onSend()">Рассылка</sphera-action-btn> 
      </v-col>
      <template v-if="admin">
        <v-col>
          <sphera-action-btn @click="showPairs = !showPairs">{{ showBtnLabel }}</sphera-action-btn> 
        </v-col>
      </template>
    </v-row>
    <v-card class="mt-3" />
    <template v-if="showPairs">
      <template v-for="(pair, index) in record.memberships">
        <v-card :key="index" class="mt-3" color="accent">
          <v-container pa-2>
            <v-row>
              <v-col cols="3">
                <sphera-input v-model="pair.member_name" readonly label="Имя учатсника" />
              </v-col>
              <v-col cols="3">
                <sphera-input v-model="pair.member_email" readonly label="Почта участника" />
              </v-col>
              <v-spacer />
              <v-col cols="3">
                <sphera-input v-model="pair.santa_name" readonly label="Тайный санта" />
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </template>
    </template>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  model: { prop: 'record', event: 'change' },
  props: {
    record: { type: Object, required: true },
    admin: { type: Boolean, required: true},
    draftid: { type: [Number, String], required: true},
  },
  data() {
    return {
      http: new this.$http(),
      showPairs: false,
    };
  },
  computed: {
    showBtnLabel(): string {
      return this.showPairs ? 'Скрыть пары' : 'Показать пары';
    },
    members(): any[] {
      const arr = [] as any;
      this.record.memberships.forEach( (membership: any) => {
        arr.push({id: membership.id, member: membership.member});
      });
      return arr;
    },
  },
  methods: {
    async onSwop() {
      await this.http.post('draft/swop', {id: this.draftid});
      this.$emit('swop');
    },
    async onSend() {
      await this.http.post('draft/email', {id: this.draftid});
    },
  },
});
</script>