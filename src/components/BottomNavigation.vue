<template>
  <v-navigation-drawer v-model="drawer" :color="color" expand-on-hover :mini-variant="miniVariant" app dark>
    <v-list dense nav class="py-0">
      <v-list-item two-line :class="miniVariant && 'px-0'">
        <v-list-item-avatar>
          <img src="https://randomuser.me/api/portraits/men/81.jpg">
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Автосфера</v-list-item-title>
          <v-list-item-subtitle />
        </v-list-item-content>
      </v-list-item>

      <v-divider />

      <v-list-item v-for="item in items" :key="item.title" link :to="item.path">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'HelloWorld',
  props: {
    miniVariant: { type: Boolean, default: true },
  },
  data() {
    return {
      drawer: true,
      items: [
        { title: 'Жеребьевка', icon: 'mdi-help-box', path: '/draft' },
        { title: 'Коробочки', icon: 'mdi-view-dashboard', path: '/mydrafts' },
        // { title: 'Заказы', icon: 'mdi-view-dashboard', path: '/orders' },
        // { title: 'Клиенты', icon: 'mdi-image', path: '/clients' },
        // { title: 'Запчасти', icon: 'mdi-help-box', path: '/parts' },
        // { title: 'Поставщики', icon: 'mdi-help-box', path: '/suppliers' },
        { title: 'Тестирование компонентов', icon: 'mdi-image', path: '/test' },
      ],
      color: 'primary',
    };
  },
});
</script>
