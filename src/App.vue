<template>
  <v-app>
    <!-- Авторизация -->
    <LoginDialog />
    <!-- Боковая менюшка -->
    <BottomNavigation />
    <!-- Тулбар сверху -->
    <AppToolbar> </AppToolbar>
    <!-- Основной контент -->
    <v-content>
      <router-view />
    </v-content>
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
