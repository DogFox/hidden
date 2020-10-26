<template>
  <v-navigation-drawer
    v-model="drawer"
    :color="color"
    expand-on-hover
    :mini-variant="miniVariant"
    app
    clipped
    dark
    @mouseover.native="hover=true"
    @mouseleave.native="hover=false"
  >
    <v-list dense nav class="py-0">
      <v-list-item two-line style="min-height:100px">
        <!-- <v-list-item-avatar size="40">
          <img src="../assets/santa.jpg">
        </v-list-item-avatar> -->
        <v-col>
          <h2 :class="hover ? 'show' : 'transparent'">
            Тайный санта
          </h2>
        </v-col>
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
    <template v-slot:append>
      <v-container>
        <v-row no-gutters>
          <v-col>
            <v-icon large @click="toAuthor()">mdi-vk</v-icon>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'HelloWorld',
  data() {
    return {
      showTitle: false,
      drawer: true,
      hover: false,
      miniVariant: true,
      items: [
        { title: 'Жеребьевка', icon: 'mdi-help-box', path: '/draft' },
        { title: 'Коробочки', icon: 'mdi-view-dashboard', path: '/mydrafts' },
        // { title: 'Заказы', icon: 'mdi-view-dashboard', path: '/orders' },
        // { title: 'Клиенты', icon: 'mdi-image', path: '/clients' },
        // { title: 'Запчасти', icon: 'mdi-help-box', path: '/parts' },
        // { title: 'Поставщики', icon: 'mdi-help-box', path: '/suppliers' },
        // { title: 'Тестирование компонентов', icon: 'mdi-image', path: '/test' },
      ],
      color: 'primary',
    };
  },
  methods: {
    onChange( payload: any) {
      console.log(payload);
      if( payload === false) {
        this.showTitle = true;   
      }
    },
    toAuthor() {
      window.open('https://vk.com/id13606999');
    },
  },
});
</script>

<style scoped>

.transparent {
  opacity: 0;
}
.show {
  opacity: 1;
  transition: opacity .6s ease-in-out;
}
</style>