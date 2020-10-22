<template>
  <v-container>
    <v-row>
      <v-row class="justify-center">
        <sphera-action-btn @click="onSend()">Рассылка</sphera-action-btn> 
        <sphera-action-btn @click="showPairs = !showPairs">{{ showBtnLabel }}</sphera-action-btn> 
      </v-row>
    </v-row>
    <template v-if="showPairs">
      <template v-for="(pair, index) in members">
        <!-- <v-card  class="mt-3" color="accent"> -->
        <v-container :key="index" pa-2>
          <v-row>
            <v-col cols="3">
              <sphera-input v-model="pair.member_name" readonly label="Имя учатсника" />
            </v-col>
            <v-col cols="3">
              <sphera-input v-model="pair.member_email" readonly label="Почта участника" />
            </v-col>
            <v-spacer />
            <v-col cols="3">
              <sphera-input v-model="pair.santa_name" readonly label="Тайный санта" :type="pair.type" prepend-icon="mdi-lock" @prependClick="changeType(pair)" />
            </v-col>
          </v-row>
        </v-container>
        <!-- </v-card> -->
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
    draftid: { type: [Number, String], required: true},
  },
  data() {
    return {
      http: new this.$http(),
      showPairs: false,
      members: [] as any[],
    };
  },
  computed: {
    showBtnLabel(): string {
      return this.showPairs ? 'Скрыть пары' : 'Показать пары';
    },
  },
  created() {
      const arr = [] as any;
      this.record.memberships.forEach( (membership: any) => {
        arr.push({id: membership.id, member_name: membership.member_name, member_email: membership.member_email, santa_name: membership.santa_name, type: 'password'});
      });
      this.members = arr;
  },
  methods: {
    async onSwop() {
      await this.http.post('draft/swop', {id: this.draftid});
      this.$emit('swop');
    },
    async onSend() {
      await this.http.post('draft/email', {id: this.draftid});
    },
    changeType( pair: any ) {
      if( pair.type && pair.type === 'password') {
        this.$set(pair, 'type', '');
      } else {
        pair.type = 'password';
      }
    },
  },
});
</script>