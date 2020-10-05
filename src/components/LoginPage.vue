<template>
  <v-container fill-height class="align-center justify-center">
    <v-card style="width: 500px">
      <v-container>
        <v-row>
          <v-col>
            <v-text-field v-model="record.username" label="Логин" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field v-model="record.email" label="Почта" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field v-model="record.password" label="Пароль" type="password" />
          </v-col>
        </v-row>
        <v-row>
          <v-btn color="blue darken-1" text @click="onEnter()">Войти</v-btn>
          <v-btn color="blue darken-1" text @click="onRegister()">Зарегистрироваться</v-btn>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'LoginDial',
  model: { prop: 'record', event: 'change' },
  data() {
    return {
      dial: true,
      record: {
        email: 'kurovda@gmail.com',
        username: 'DogFox',
        password: '8GjblNpd',
      },
    };
  },
  methods: {
    async onEnter() {
      const result = await new this.$http().post('users/login', this.record);
      const isAuth = this.$store.dispatch('SIGN_IN', { login: this.record.username, token: result.token });
    },
    async onRegister() {
      const result = await new this.$http().post('users/register', this.record);
    },
  },
});
</script>