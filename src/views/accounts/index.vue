<template>
  <v-container>
    <v-card>
      <v-btn icon>
        <v-icon @click="$router.go(-1)"> mdi-close </v-icon>
      </v-btn>
      <v-row class="justify-center">
        <v-col sm="12" md="6" lg="4">
          <sphera-input v-model="record.email" label="Email" disabled />
        </v-col>
        <v-col sm="12" md="6" lg="4">
          <sphera-input v-model="record.username" label="Login" />
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-col sm="12" md="6" lg="4">
          <sphera-input v-model="record.first_name" label="Имя" />
        </v-col>
        <v-col sm="12" md="6" lg="4">
          <sphera-input v-model="record.last_name" label="Фамилия" />
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-col sm="12" md="6" lg="4">
          <sphera-input v-model="old_pass" label="Старый пароль" type="password" />
        </v-col>
        <v-col sm="12" md="6" lg="4">
          <sphera-input v-model="new_pass" label="Новый пароль" type="password" @change="passChange = true" />
        </v-col>
      </v-row>
      <v-row class="justify-center pa-3">
        <sphera-action-btn :disabled="!changed" @click="onChangeUser()">Сохранить изменения</sphera-action-btn>
        <sphera-action-btn :disabled="!passChange" @click="onChangePassword()">Сменить пароль</sphera-action-btn>
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

interface User {
  email: string;
  username: string;
  id: number;
  first_name: string;
  last_name: string;
}

export default Vue.extend({
  name: 'Accounts',
  data() {
    return {
      record: {} as User,
      changed: false,
      passChange: false,
      old_pass: '',
      new_pass: '',
    };
  },
  async created() {
    this.record = await new this.$http().get('users/current');
    this.changed = false;
  },
  methods: {
    async onChangeUser() {
      this.record = await new this.$http().put('users/part_update/' + this.record.id, { first_name: this.record.first_name, last_name: this.record.last_name });
      this.$toast('Данные были сохранены');
    },
    async onChangePassword() {
      await new this.$http().post('users/change_password', { old_password: this.old_pass, new_password: this.new_pass });
      this.$toast('Пароль был изменен');
    },
  },
  watch: {
    record: {
      deep: true,
      handler(to, from) {
        if (from && from.id) {
          this.changed = true;
        }
      },
    },
  },
});
</script>
