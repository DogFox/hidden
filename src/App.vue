<template>
  <v-app>
    <!-- Авторизация -->
    <!-- <LoginDialog /> -->
    <!-- Боковая менюшка -->
    <!-- <BottomNavigation v-if="isAuth" /> -->
    <!-- Тулбар сверху -->
    <!-- <AppToolbar v-if="isAuth" /> -->
    <AppToolbarNew />
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
      } else {
        return false;
      }
    },
  },
});
</script>

<style scoped>
/* .back {
  background-image:  url('./assets/background.jpeg') ;
  background-size:auto;
}
#inspire {
  background: none;
} */

.bg {
  position: relative;
  /* height: 100vh;
  background: url('./assets/background_new.jpg') no-repeat center center;
  background-size: cover;
  background-attachment: fixed; */
  }

 .bg::before {
      background: url("./assets/background_new.jpg") no-repeat center center;
      background-size: cover;
      content: ' ';
      height: 100%;
      left: 0;
      position: fixed;
      top: 0;
      width: 100%;
      will-change: transform;
      /* z-index: -1; */
}

</style>
