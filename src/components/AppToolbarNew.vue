<template>
  <v-app-bar app dense color="white">
    <!-- prominent -->
    <!-- dark -->
    <!-- src="../assets/header.png"  -->
    <!-- <template v-slot:img="{ props }">
      <v-img v-bind="props" gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)" />
    </template> -->

    <v-toolbar-title class="tab--color">Тайный санта</v-toolbar-title>

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

      <!-- <sphera-action-btn v-if="tab==='/draft'" color="white" outlined @click="onDraftAll()">Замутить санту</sphera-action-btn>  -->
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
.tab--color {
  background-color: rgb(255, 53, 53);
  border-radius: 0.8em;
  padding: 0 10px 0 10px;
  color: rgb(255, 255, 255);
}
</style>