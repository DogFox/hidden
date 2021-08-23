<template>
  <div class="member-card">
    <v-container>
      <v-row no-gutters>
        <v-col>
          <sphera-input v-model="item.name" label="ФИО" placeholder="ФИО участника" required />
        </v-col>
        <v-col>
          <sphera-input v-model="item.email" label="Email" placeholder="EMAIL участника" required />
        </v-col>

        <div class="btn_close">
          <button>
            <v-icon @click="$emit('delete', item.id)"> mdi-close </v-icon>
          </button>
        </div>
        <!-- <v-col>
                  <sphera-combobox v-model="item.cross" label="Исключение" :items="items" />
                </v-col> -->
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    item: { required: true, type: Object },
  },
  data() {
    return {};
  },
  methods: {},
});
</script>
<style scoped>
.btn_close {
  position: absolute;
  right: 2px;
  top: 2px;
}
.btn_close:hover {
  height: 1.5em;
  width: 1.5em;
  border-radius: 1em;
  background-color: rgba(192, 192, 192, 1);
  transition: all 0.5s;
}
.member-card {
  border: 1px solid rgba(82, 76, 76, 0.2);
  border-radius: 0.2em;
  position: relative;
  margin: 0.2em;
}
</style>
