<template>
  <v-app-bar app dark color="primary" flat>
    <v-toolbar-title>
      <h4>
        Тайный санта бывших друзей
      </h4>
    </v-toolbar-title>
    <v-spacer />

    <!-- <v-btn color="white" icon to="/accounts">
      <v-icon>mdi-account-cog</v-icon>
    </v-btn> -->
    
    <v-menu
      v-model="menu"
      offset-y
      bottom
      left
      transition="slide-y-transition"
    >
      <template v-slot:activator="{ on }">
        <v-chip
          class="ma-2"
          color="primary"
          label
          v-on="on"
        >
          <v-icon left>
            mdi-account-circle-outline
          </v-icon>
          {{ login }}
        </v-chip>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, idx) in items"
          :key="idx"
        >
          <v-list-item-title>{{ item }}</v-list-item-title>
        </v-list-item>
        <v-tooltip left>
          <template v-slot:activator="data1">
            <v-btn icon v-on="data1.on" @click="onExit()">
              <v-icon>mdi-logout</v-icon>
            </v-btn>
          </template>
          Выход
        </v-tooltip>
      </v-list>
    </v-menu>
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
  },
  data() {
    return {
      menu: null,
      items: ['раз', 'два'],
    };
  },
});
</script>