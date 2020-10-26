<template>
  <v-dialog v-model="dial" persistent max-width="500px" v-bind="$attrs">
    <v-toolbar dark color="primary">
      <v-toolbar-title>Войдите в систему!</v-toolbar-title>
      <v-spacer />
      <v-toolbar-items />
    </v-toolbar>
    <v-card>
      <v-card-text>
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
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="blue darken-1" text @click="onEnter()">Войти</v-btn>
        <v-btn color="blue darken-1" text @click="onRegister()">Зарегистрироваться</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
        email: '',
        username: '',
        password: '',
      },
    };
  },
  created() {
    this.checkRouteToken();
  },
  methods: {
    async checkRouteToken() {
      if (this.$route && this.$route.query ) {
        const queryParams = this.$route.query;
        if(queryParams.token) {
          this.$router.replace({ query: {} });
          const isAuth = this.$store.dispatch('SIGN_IN', { token: queryParams.token });
          this.dial = false;
        }
      }
    },
    async onEnter() {
      const result = await new this.$http().post('users/login', this.record);
      if (result && result.token) {
        const isAuth = this.$store.dispatch('SIGN_IN', { login: this.record.username, token: result.token });
        this.dial = false;
        this.$toast(`Добро пожаловать ${result.name}`);
      }
    },
    async onRegister() {
      const result = await new this.$http().post('users/register', this.record);
    },
  },
});
</script>