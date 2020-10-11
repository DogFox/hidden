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
      items: [{id: 0, name: 'test', email: 'test@test.com', cross: null},
      {id: 1, name: 'test2', email: 'test2@test.com', cross: null},
      {id: 2, name: 'test3', email: 'test3@test.com', cross: null},
      {id: 3, name: 'test4', email: 'test4@test.com', cross: null},
      {id: 4, name: 'Denis', email: 'kurovda@gmail.com', cross: null},
      ] as any[],
      cross: null,
      lastId: 4,
      http: new this.$http(),
      boxName: 'Коробочка',
    };
  },
  methods: {
    addItem() {
      this.items.push({id: ++this.lastId });
    },
    async onDraftAll() {
      const result = this.http.post('customer/postlist', {items: this.items.filter(item=>{ return item.name && item.name !== '';}), box: this.boxName});
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