<template>
  <v-app-bar app color="#6A76AB" dark prominent dense src="https://fullhdoboi.ru/wp-content/uploads/_ph/6/645556238.jpg" fade-img-on-scroll>
    <template v-slot:img="{ props }">
      <v-img v-bind="props" gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)" />
    </template>

    <v-toolbar-title>Тайный санта</v-toolbar-title>

    <v-spacer />
    <!-- {{ isAuth }} -->
    <template v-if="isAuth">
      <v-chip class="ma-2" label outlined to="/accounts">
        <v-icon left>
          mdi-account-circle-outline
        </v-icon>
        {{ login }}
      </v-chip>

      <v-btn icon>
        <v-icon @click="onLogout()">
          mdi-logout
        </v-icon>
      </v-btn>
    </template>
    <template v-else>
      <v-chip class="ma-2" label outlined to="/authentication">
        Войти
      </v-chip>
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
        { title: 'Жеребьевка', icon: 'mdi-help-box', path: '/draft' },
        { title: 'Коробочки', icon: 'mdi-view-dashboard', path: '/mydrafts', isAuth: true },
        { title: 'Описание', icon: 'mdi-view-dashboard', path: '/about' },
        // { title: 'Заказы', icon: 'mdi-view-dashboard', path: '/orders' },
        // { title: 'Клиенты', icon: 'mdi-image', path: '/clients' },
        // { title: 'Запчасти', icon: 'mdi-help-box', path: '/parts' },
        // { title: 'Поставщики', icon: 'mdi-help-box', path: '/suppliers' },
        // { title: 'Тестирование компонентов', icon: 'mdi-image', path: '/test' },
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