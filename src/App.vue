<template>
  <v-app>
    <!-- Авторизация -->
    <!-- <LoginDialog /> -->
    <!-- Боковая менюшка -->
    <BottomNavigation v-if="isAuth" />
    <!-- Тулбар сверху -->
    <AppToolbar v-if="isAuth" />
    <!-- Основной контент -->
    <v-main class="bg">
      <LoginPage v-if="!isAuth" />
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
  computed: {
    isAuth(): boolean {
      return this.$store.getters.isAuth();
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
