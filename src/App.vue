<template>
  <v-app>
    <!-- Авторизация -->
    <!-- <LoginDialog /> -->
    <!-- Боковая менюшка -->
    <BottomNavigation />
    <!-- Тулбар сверху -->
    <AppToolbar />
    <!-- Основной контент -->
    <v-main class="bg">
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',

  data() {
    return {};
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
