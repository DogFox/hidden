
<template>
  <v-container>
    <v-card class="opacity-color">
      <v-row align="center" justify="center">
        <v-col sm="12" md="6" lg="5">
          <template v-if="!restoreMode">
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
              <v-row align="center" justify="center">
                <sphera-action-btn color="black" text small @click="restoreMode = !restoreMode">
                  Забыли пароль?
                </sphera-action-btn>
              </v-row>
            </v-col>
          </template>
          <template v-else>
            <v-col>
              <sphera-input v-model="record.email" label="Почта" />
            </v-col>
            <v-col>
              <v-row align="center" justify="center">
                <sphera-action-btn color="blue darken-1" block large outlined @click="onRestorePassword()">Восстановить пароль</sphera-action-btn>
              </v-row>
            </v-col>
          </template>
        </v-col>
      </v-row>
    </v-card>
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
      restoreMode: false,
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
        this.$router.push('/mydrafts');
      }
    },
    async onRegister() {
      const result = await new this.$http().post('users/register', this.record);
      if (result) {
        await this.onEnter();
      }
    },
    async onRestorePassword() {
      const result = await new this.$http().post('users/restore_password', { email: this.record.email });
      if (result) {
        this.$toast(result);

        this.$set(this.record, 'email', '');
        this.$set(this.record, 'username', '');
        this.$set(this.record, 'password', '');
        this.restoreMode = false;
      }
    },
  },
});
</script>