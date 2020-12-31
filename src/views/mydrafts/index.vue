<template>
  <v-container class="pa-4 text-center">
    <v-row class="fill-height" align="center" justify="center">
      <template v-for="(item, i) in items">
        <v-col :key="i" sm="12" md="8" lg="6">
          <v-hover v-slot:default="{ hover }">
            <v-card :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }" @click="onClickBox(item)">
              <!-- <v-img class="white--text align-end" height="150px" :src="box_background"> -->
                <v-card-title class="title">
                  <v-row class="fill-height flex-column" justify="space-between">
                    <span class="mt-4 subheading">
                      {{ item.name }}
                    </span>

                    <span class="ma-0 body-1">
                      {{ item.description }}
                    </span>
                  </v-row>
                </v-card-title>
              <!-- </v-img> -->
            </v-card>
          </v-hover>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
// import ClientModal from './ClientModal.vue';
import { mydrafts } from './mydrafts';

export default Vue.extend({
  name: 'Mydrafts',
  // components: { ClientModal },
  data() {
    return {
      items: [],
      headers: mydrafts.fields,
      path: mydrafts.path,
      box_background: require('@/assets/box_background.jpg'),
    };
  },
  async created() {
    this.items = await new this.$http().get(this.path);
  },
  methods: {
    onClickBox(payload: any) {
      this.$router.push({ name: 'draftid', params: { draftid: payload.id } });
    },
  },
});
</script>

<style scoped>
.v-card {
  transition: opacity 0.4s ease-in-out;
  background-color: rgba(244, 199, 163, 0.8);

}
.v-card:not(.on-hover) {
  opacity: 0.6;
}
</style>