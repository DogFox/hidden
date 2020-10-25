<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <sphera-input v-model="boxName" label="Название группы" />
      </v-col>
      
      <v-col>
        <!-- <sphera-action-btn @click="addItem()">Добавить участника</sphera-action-btn>   -->

        <!-- <v-btn @click="addItem()">
          Добавить участника
        </v-btn>  -->

        <!-- <v-btn @click="onDraft()">Вставить в базу участников</v-btn>  -->
        <sphera-action-btn @click="onDraftAll()">Замутить санту</sphera-action-btn> 
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <sphera-input v-model="boxDescription" label="Описание группы" placeholder="Придумайте короткое описание вашей группы" />
      </v-col>
    </v-row>
    <v-card>
      <v-container>
        <template v-for="item in items">
          <v-row :key="item.id"> 
            <v-col cols="8">
              <sphera-input v-model="item.name" label="ФИО" placeholder="ФИО участника" />
            </v-col>
            <v-col>
              <sphera-input v-model="item.email" label="Email" placeholder="EMAIL участника" />
            </v-col>
            <v-col>
              <sphera-combobox v-model="item.cross" label="Исключение" :items="items" />
            </v-col>
          </v-row>
        </template>
      </v-container>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      file: '',
      items: [
        {id: 0, name: 'hidden', email: 'hidden.santa76@gmail.com', cross: null},
      // {id: 0, name: 'Жёрик', email: 'georg2315@gmail.com', cross: null},
      // {id: 1, name: 'Дарья', email: 'orintest@gmail.com', cross: null},
      // {id: 2, name: 'Алешенька Ш.', email: 'altdarksoul@yandex.ru', cross: null},
      // {id: 3, name: 'Денис Л.', email: 'den.a.laure@gmail.com', cross: null},
      {id: 1, name: 'Denis', email: 'kurovda@gmail.com', cross: null},
      // {id: 5, name: 'Татьяна', email: 'ms.yuo24@mail.ru', cross: null},
      // {id: 6, name: 'КАнтошина', email: 'kantoshina@gmail.com', cross: null},
      // {id: 7, name: 'Падлик', email: 'chenleen666@gmail.com', cross: null},
      ] as any[],
      cross: null,
      lastId: 7,
      http: new this.$http(),
      boxName: 'Коробочка',
      boxDescription: '',
    };
  },
  methods: {
    addItem() {
      this.items.push({id: ++this.lastId });
    },
    async onDraftAll() {
      const result = this.http.post('customer/postlist', {items: this.items.filter(item=>{ return item.name && item.name !== '';}), box:{ name: this.boxName, description: this.boxDescription}});
    },
    async onDraft() {
      this.items.forEach(element => {
        const result = this.http.post('customer', {id: element.id, name: element.name, email: element.email});
      });
    },
  },
  watch:{ 
    items: {
      deep: true,
      immediate: true,
      handler() {
        if( this.items[this.lastId] && this.items[this.lastId].name && this.items[this.lastId].name !== '' ) {
          this.addItem();
        }
      },
    },
  },
});
</script>