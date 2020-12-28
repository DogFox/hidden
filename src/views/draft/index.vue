<template>
  <v-container>
    <v-card class="opacity-color">
      <v-row align="center" justify="center">
        <v-col sm="12" lg="5" md="8">
          <v-row no-gutters>
            <sphera-input v-model="boxName" label="Название группы" />

            <sphera-action-btn class="ml-8" color="blue darken-1" outlined @click="onDraftAll()">Замутить санту</sphera-action-btn>
          </v-row>
        </v-col>

        <!-- <sphera-action-btn @click="addItem()">Добавить участника</sphera-action-btn>   -->

        <!-- <v-btn @click="addItem()">
          Добавить участника
        </v-btn>  -->

        <!-- <v-btn @click="onDraft()">Вставить в базу участников</v-btn>  -->
      </v-row>
      <v-row align="center" justify="center">
        <v-col sm="12" lg="5" md="8">
          <sphera-input v-model="boxDescription" label="Описание группы" placeholder="Придумайте короткое описание вашей группы" />
        </v-col>
      </v-row>
      <v-row align="center" justify="center" class="pl-2 pr-2">
        <template v-for="item in items">
          <v-col :key="item.id" sm="12" md="6" lg="4">
            <v-card>
              <v-container>
                <v-row>
                  <v-col>
                    <sphera-input v-model="item.name" label="ФИО" placeholder="ФИО участника" />
                  </v-col>
                  <v-col>
                    <sphera-input v-model="item.email" label="Email" placeholder="EMAIL участника" />
                  </v-col>

                  <v-btn icon class="pt-6">
                    <v-icon @click="deleteMember(item.id)"> mdi-close </v-icon>
                  </v-btn>
                  <!-- <v-col>
                  <sphera-combobox v-model="item.cross" label="Исключение" :items="items" />
                </v-col> -->
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </template>
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      file: '',
      items: [{ id: 0, name: '', email: '' }] as any[],
      cross: null,
      lastId: 0,
      http: new this.$http(),
      boxName: 'Коробочка',
      boxDescription: '',
    };
  },
  methods: {
    addMember() {
      this.items.push({ id: ++this.lastId });
    },
    deleteMember(id: number) {
      const index = this.items.findIndex(item => item.id === id);
      this.items.splice(index, 1);
      this.lastId--;
    },
    async onDraftAll() {
      const result = this.http.post('customer/postlist', {
        items: this.items.filter((item) => {
          return item.name && item.name !== '';
        }),
        box: { name: this.boxName, description: this.boxDescription },
      });
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
/* .theme--light.v-tabs-items {
  background-color: rgba(255, 255, 255, 0.8);
} */
</style>