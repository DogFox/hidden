<template>
  <v-container>
    <template v-if="loading">
      <v-progress-circular
        :size="50"
        indeterminate
        color="primary"
      />
    </template>
    <template v-else>
      <v-row align="center" justify="center" class="pt-2">
        <v-col sm="12" lg="5" md="8">
          <v-row no-gutters>
            <sphera-input v-model="boxName" label="Название группы" />

            <sphera-action-btn class="startBtn" color="blue darken-1" outlined @click="onDraftAll()">Замутить санту</sphera-action-btn>
          </v-row>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col sm="12" lg="5" md="8">
          <sphera-input v-model="boxDescription" label="Описание группы" placeholder="Придумайте короткое описание вашей группы" />
        </v-col>
      </v-row>
      <v-row no-gutters align="center" justify="center" class="pl-2 pr-2 pb-2">
        <template v-for="item in items">
          <v-col :key="item.id" sm="12" md="6" lg="4">
            <new-santa :item="item" @delete="deleteMember($event)" />
          </v-col>
        </template>
      </v-row>
    </template>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import NewSanta from './NewSanta.vue';

export default Vue.extend({
  components: { NewSanta },
  data() {
    return {
      file: '',
      items: [{ id: 0, name: '', email: '' }] as any[],
      cross: null,
      http: new this.$http(),
      boxName: 'Коробочка',
      boxDescription: '',
      loading: false,
    };
  },
  computed: {
    lastId(): number {
      return this.items.length - 1;
    },
  },
  methods: {
    addMember() {
      this.items.push({ id: this.lastId + 1 });
    },
    deleteMember(id: number) {
      const index = this.items.findIndex((item) => item.id === id);
      this.items.splice(index, 1);
    },
    async onDraftAll() {
      const membersArr = this.items.filter((item) => {
        return item.name && item.name !== '' && item.email && item.email !== '';
      });
      if (membersArr.length === 0) {
        this.$toast('Не заполнен массив участников!', { color: 'error' });
        return;
      }

      this.loading = true;
      const result = await this.http.post('customer/postlist', {
        items: membersArr,
        box: { name: this.boxName, description: this.boxDescription },
      });

      this.$router.push('/mydrafts');
    },
    async onDraft() {
      this.items.forEach((element) => {
        const result = this.http.post('customer', { id: element.id, name: element.name, email: element.email });
      });
    },
  },
  watch: {
    items: {
      deep: true,
      immediate: true,
      handler() {
        if (this.items[this.lastId] && this.items[this.lastId].name && this.items[this.lastId].name !== '') {
          this.addMember();
        }
      },
    },
  },
});
</script>

<style scoped>
.startBtn {
  position: relative;
  left: 1em;
  bottom: 0.5em;
}
</style>