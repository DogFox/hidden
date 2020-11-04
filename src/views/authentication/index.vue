
<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col sm="12" md="6" lg="5">
        <v-row>
          <v-col>
            <sphera-input v-model="record.username" label="Логин" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <sphera-input v-model="record.password" label="Пароль" type="password" />
          </v-col>
        </v-row>
        <v-row v-if="registerMode">
          <v-col>
            <sphera-input v-model="record.email" label="Почта" />
          </v-col>
        </v-row>
        <v-col>
          <v-row align="center" justify="center">
            <sphera-action-btn v-if="!registerMode" color="blue darken-1" block large outlined @click="onEnter()">Войти</sphera-action-btn>
            <sphera-action-btn v-if="registerMode" color="blue darken-1" block large outlined @click="onRegister()">Зарегистрироваться</sphera-action-btn>
          </v-row>
          <v-row align="center" justify="center">
            <sphera-action-btn color="black" text small @click="registerMode = !registerMode">
              {{ !registerMode ? 'Нет аккаунта?' : 'Уже есть аккаунт?' }}
            </sphera-action-btn>
          </v-row>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import router from '@/plugins/router';
import Vue from 'vue';

export default Vue.extend({
  name: 'LoginDial',
  model: { prop: 'record', event: 'change' },
  data() {
    return {
      registerMode: false,
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
      if (this.$route && this.$route.query) {
        const queryParams = this.$route.query;
        if (queryParams.token) {
          this.$router.replace({ query: {} });
          const isAuth = this.$store.dispatch('SIGN_IN', { token: queryParams.token });
        }
      }
    },
    async onEnter() {
      const result = await new this.$http().post('users/login', this.record);
      if (result && result.token) {
        const isAuth = this.$store.dispatch('SIGN_IN', { login: this.record.username, token: result.token });
        this.$toast(`Добро пожаловать ${result.name}`);
        this.$router.push('/draft');
      }
    },
    async onRegister() {
      const result = await new this.$http().post('users/register', this.record);
      if (result) {
        await this.onEnter();
      }
    },
  },
});
</script>