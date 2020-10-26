<template>
  <v-app-bar
    app
    clipped-left
    class="elevation-1"
    color="primary" 
    elevate-on-scroll
  >
    <!-- <v-toolbar-title>
      <h4>
        Тайный санта бывших друзей
      </h4>
    </v-toolbar-title> -->
    <sphera-action-btn class="no-border" simple-icon="mdi-arrow-left" outlined color="white" @click="$router.go(-1)" />
    <v-spacer />

    <v-chip
      class="ma-2"
      color="primary"
      label
      to="/accounts"
    >
      <v-icon left>
        mdi-account-circle-outline
      </v-icon>
      {{ login }}
    </v-chip>

    <v-chip
      v-if="isAuth"
      class="ma-2"
      color="primary"
      label
      @click="onLogout()"
    >
      <v-icon left>
        mdi-logout
      </v-icon>
    </v-chip>
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
  methods: {
    onLogout() {
      this.$store.dispatch('SIGN_OUT');
    },
  },
});
</script>