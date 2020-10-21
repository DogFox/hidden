<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card-title class="justify-center">
          Поздравляю! Вы - тайный санта. Ваша жертва: {{ member.member_name }}
        </v-card-title>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <sphera-textarea v-model="member.member_wishes" readonly label="Список желаний одариваемого" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <sphera-textarea v-model="member.santa_wishes" label="Вы поможете своему санте, указав что бы вы хотели!" @change="onChangeWishes()" />
      </v-col>
    </v-row>
            
    <v-row v-if="record.limit || admin">
      <template v-if="admin">
        <v-col cols="3">
          <v-checkbox v-model="record.limit" class="py-0 my-0" label="Ограничение бюджета" :disabled="!admin" @change="onChangeBox()" />
        </v-col>
        <v-col>
          <sphera-input v-model="record.limitValue" label="Установленное ограничение" :disabled="!admin" @change="onChangeBox()" />
        </v-col>
      </template>
      <template v-else>
        <v-col>
          <span class="font-weight-bold">Внимание! Организатор установил ограничение по общей стоимости подарка в {{ record.limitValue }} рублей!</span>
          <span class="font-weight-bold">Пожалуйста, постарайтесь придерживаться плана!</span>
        </v-col>
      </template>
    </v-row>
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
    };
  },
  computed: {
    member(): any {
      if( this.record && this.record.santas && this.record.santas[0]) {
        return this.record.santas[0];
      }
      return {};
    },
  },
  methods: {
    async onChangeBox() {
      await this.http.put('draft/part_update/' + this.draftid, {limit: this.record.limit, limitValue:this.record.limitValue});
    },
    async onChangeWishes() {
      console.log(this.member.santa);
      await this.http.put('member/part_update/' + this.member.santa, {wishes: this.member.santa_wishes});
    },
  },
});
</script>