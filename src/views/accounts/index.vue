<template>
  <v-card>
    <v-container>
      <v-row class="justify-center">
        <v-col cols="6">
          <sphera-input v-model="record.email" label="Email" disabled />
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-col cols="3">
          <sphera-input v-model="record.old_pass" label="Старый пароль" />
        </v-col>
        <v-col cols="3">
          <sphera-input v-model="record.new_pass" label="Новый пароль" @change="passChange = true" />
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-col cols="3">
          <sphera-input v-model="record.first_name" label="Имя" />
        </v-col>
        <v-col cols="3">
          <sphera-input v-model="record.last_name" label="Фамилия" />
        </v-col>
      </v-row>
      <v-row v-if="changed" class="justify-center">
        <sphera-action-btn @click="onChangeUser()">Сохранить изменения</sphera-action-btn> 
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  old_pass: string;
  new_pass: string;
}

export default Vue.extend({
  name: 'Accounts',
  data() {
    return {
      record: {} as User,
      changed: false,
      passChange: false,
    };
  },
  async created() {
    this.record = await new this.$http().get('users/current');
    this.changed = false;
  },
  methods: {
    async onChangeUser() {
      this.record = await new this.$http().put('users/part_update/' + this.record.id, {first_name: this.record.first_name, last_name:this.record.last_name});
      if( this.passChange )
      {
        await new this.$http().post('users/change_password', {old_password: this.record.old_pass, new_password: this.record.new_pass});
      }
    },
  },
  watch:{ 
    record: {
      deep: true,
      handler( to, from) {
        if( from && from.id ) {
          this.changed = true;
        }
      },
    },
  },
});
</script>
