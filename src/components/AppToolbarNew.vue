<template>
  <v-app-bar app dense color="white" prominent>
    <v-toolbar-title>
      <img src="../assets/Santa_hat.jpg" class="logo--display christmass-color" />
      <span class="title--show title--text"> Тайный санта </span>
    </v-toolbar-title>

    <v-spacer />
    <!-- {{ isAuth }} -->
    <template v-if="isAuth">
      <v-chip class="ma-2" label outlined to="/accounts">
        <v-icon left> mdi-account-circle-outline </v-icon>
        {{ login }}
      </v-chip>

      <v-btn icon>
        <v-icon @click="onLogout()"> mdi-logout </v-icon>
      </v-btn>
    </template>
    <template v-else>
      <v-chip class="ma-2" label outlined to="/authentication"> Войти </v-chip>
    </template>

    <template v-slot:extension>
      <v-tabs v-model="tab" align-with-title>
        <template v-for="(item, index) in items">
          <v-tab v-if="item.isAuth ? isAuth : true" :key="index" :to="item.path">{{ item.title }}</v-tab>
        </template>
      </v-tabs>
      <v-spacer />

      <v-icon large @click="toAuthor()">mdi-vk</v-icon>
    </template>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'AppToolbar',
  computed: {
    login(): boolean {
      return this.$store.getters.getLogin();
    },
    isAuth(): boolean {
      return this.$store.getters.isAuth();
    },
  },
  data() {
    return {
      tab: null,
      items: [
        { title: 'Коробочки', icon: 'mdi-view-dashboard', path: '/mydrafts', isAuth: true },
        { title: 'Жеребьевка', icon: 'mdi-help-box', path: '/draft' },
        { title: 'Описание', icon: 'mdi-view-dashboard', path: '/about' },
      ],
    };
  },
  methods: {
    onLogout() {
      this.$store.dispatch('SIGN_OUT');
    },
    toAuthor() {
      window.open('https://vk.com/id13606999');
    },
  },
});
</script>
<style scoped>
.logo--display {
  position: absolute;
  top: 0px;
  left: 10px;
  z-index: 1;
}
.title--show {
  position: absolute;
  top: 35px;
  z-index: 10;
}
.title--text {
  font-size: 25px;
  font-weight: 500;
}
img {
  display: block;
  width: 3em;
  height: auto;
}
</style>