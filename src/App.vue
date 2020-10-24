<template>
  <v-app>
    <!-- Авторизация -->
    <LoginDialog v-if="!isAuth" />
    <!-- Боковая менюшка -->
    <BottomNavigation v-if="isAuth" />
    <!-- Тулбар сверху -->
    <AppToolbar v-if="isAuth" />
    <!-- Основной контент -->
    <v-main class="bg">
      <router-view v-if="isAuth" />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
  data() {
    return {
      intervalID: null as any | null,
    };
  },
  computed: {
    isAuth(): boolean {
      return this.$store.getters.isAuth();
    },
  },
  async created() {
    this.intervalID = setInterval(this.checkIsAuth, +this.$store.getters.getBackendStateInterval());
  },
  beforeDestroy() {
    if (this.intervalID) {
      clearInterval(this.intervalID); 
    }
  },
  methods: {
    async checkIsAuth() {
      if (this.isAuth) {
        return true;
      }
      else {
        return false;
      }
    },
  },
});
</script>

<style scoped>

.bg {
    height: 100vh;
    background: url('./assets/background.jpeg') no-repeat center center;
    background-size: cover;
  }
</style>
