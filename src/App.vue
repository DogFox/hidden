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
    <div class="bottom-trees">
      <img src="./assets/footer.svg">
    </div>
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
.bg {
  position: relative;
}

.bg::before {
  background-size: cover;
  content: ' ';
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
}

img {
  display: block;
  width: 100%;
  height: auto;
}
</style>

<style >
/* Переопределеяем базовые стили вьютифая */
.theme--light.v-card {
  background-color: rgba(255, 255, 255, 0.8);
}
.opacity-color {
  background-color: rgba(255, 255, 255, 0.8);
}
.theme--light.v-tabs-items {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 0.5rem;
}
</style>
