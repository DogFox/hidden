
<template>
  <v-container>
    <v-card>
      <v-container>
        <span>
          Тайный Са́нта, или Секре́тный Са́нта, или Секретный Санта-Клаус (англ. Secret Santa), иногда также называется Поллианна (Pollyanna, в честь романа), Крис Киндл (Kris Kindle)
          или Крис Крингл (Kris Kringle), — рождественская церемония анонимного обмена подарками группой людей.
        </span>
      </v-container>
    </v-card>

    <v-card class="mt-4">
      <v-container>
        <span>
          Для организации Тайного Санты на вкладке "Жеребьевка" необходимо указать участников и название коробочки. После создания коробочки, можно будет настроить исключения для
          будущих сант.
        </span>
      </v-container>
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