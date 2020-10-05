<template>
  <v-container>
    <v-card height="100%">
      <v-container>
        <v-row>
          <v-col>
            <v-card-title>
              {{ record.name }}
            </v-card-title>
          </v-col>
          <v-col>
            <sphera-action-btn @click="onSwop()">Перемешать</sphera-action-btn> 
          </v-col>
        </v-row>
        <template v-for="(member, i) in record.memberships">
          <v-card :key="i" class="mt-3" color="accent">
            <v-container pa-2>
              <v-row>
                <v-col cols="3">
                  <sphera-input v-model="member.member_name" readonly label="Имя учатсника" />
                </v-col>
                <v-col cols="3">
                  <sphera-input v-model="member.member_email" readonly label="Почта участника" />
                </v-col>
                <v-spacer />
                <v-col cols="3">
                  <sphera-input v-model="member.santa_name" readonly label="Тайный санта" />
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

interface SecretBox {
  id: number;
  admin: number;
  description: string;
  memberships: Array<any>;
}

export default Vue.extend({
  props: {
    draftid: { type: [Number,String], default: null},
  },
  data() {
    return {
      record: {} as SecretBox,
      http: new this.$http(),
    };
  },
  created() {
    this.fetchData();
  },
  computed: {
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
      this.record = await this.http.get('draft/' + this.draftid);
    },
    async onSwop() {
      await this.http.post('draft/swop', {id: this.draftid});
      this.fetchData();
    },
  },
});
</script>