<template>
  <v-container>
    <v-card height="100%">
      <v-container>
        <v-row>
          <v-col>
            <v-card-title>
              {{ record.name }}
            </v-card-title>
            <v-card-subtitle>
              {{ record.description }}
            </v-card-subtitle>
          </v-col>
          <v-col>
            <sphera-action-btn @click="onSend()">Рассылка</sphera-action-btn> 
          </v-col>
          <template v-if="admin">
            <v-col>
              <sphera-action-btn @click="showPairs = !showPairs">{{ showBtnLabel }}</sphera-action-btn> 
            </v-col>
          </template>
        </v-row>
        <v-row v-if="record.limit || admin">
          <template v-if="admin">
            <v-col cols="3">
              <v-checkbox v-model="record.limit" class="py-0 my-0" label="Ограничение бюджета" :disabled="!admin" @change="onChangeBox()" />
            </v-col>
          </template>
          <v-col cols="3">
            <span>Внимание! Организатор установил ограничение по общей стоимости подарка! Пожалуйста, постарайтесь придерживаться плана!</span>
          </v-col>
          <v-col>
            <sphera-input v-model="record.limitValue" label="Установленное ограничение" :disabled="!admin" @change="onChangeBox()" />
          </v-col>
        </v-row>
        <v-card class="mt-3">
          <v-container>
            <v-row>
              <v-col>
                <v-card-title>
                  Поздравляю! Вы - тайный санта. Ваша жертва: {{ member.member_name }}
                </v-card-title>
              </v-col>
              <v-col>
                <sphera-textarea v-model="member.member_wishes" disabled label="Пожелания" />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <span>Так же вы можете помочь своему санте, указав что бы вы хотели!</span>
                <sphera-textarea v-model="member.santa_wishes" @change="onChangeWishes()" />
              </v-col>
            </v-row>
          </v-container>
        </v-card>
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
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

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
  props: {
    draftid: { type: [Number,String], default: null},
  },
  data() {
    return {
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
    member(): any {
      if( this.record && this.record.santas && this.record.santas[0]) {
        return this.record.santas[0];
      }
      return {};
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
    async onSwop() {
      await this.http.post('draft/swop', {id: this.draftid});
      this.fetchData();
    },
    async onSend() {
      await this.http.post('draft/email', {id: this.draftid});
    },
    async onChangeBox() {
      this.record = await this.http.put('draft/part_update/' + this.draftid, {limit: this.record.limit, limitValue:this.record.limitValue});
    },
    async onChangeWishes() {
      console.log(this.member.santa);
      await this.http.put('member/part_update/' + this.member.santa, {wishes: this.member.santa_wishes});
    },
  },
});
</script>