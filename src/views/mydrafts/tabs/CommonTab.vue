<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="8">
        <v-card-title class="justify-center christmass-color">
          Поздравляю! Вы - тайный санта. Ваша жертва: {{ member.member_name }}
        </v-card-title>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="8">
        <sphera-textarea v-model="member.member_wishes" readonly label="Список желаний одариваемого" />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="8">
        <sphera-textarea v-model="member.santa_wishes" label="Вы поможете своему санте, указав что бы вы хотели!" @change="onChangeWishes()" />
      </v-col>
    </v-row>
            
    <v-row v-if="record.limit" justify="center">
      <v-col cols="8">
        <span class="font-weight-bold christmass-color">Внимание! Организатор установил ограничение по общей стоимости подарка в {{ record.limitValue }} рублей!</span>
        <span class="font-weight-bold christmass-color">Пожалуйста, постарайтесь придерживаться плана!</span>
      </v-col>
    </v-row>
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
      await this.http.put('member/part_update/' + this.member.santa, {wishes: this.member.santa_wishes});
    },
  },
});
</script>


<style scoped>

</style>