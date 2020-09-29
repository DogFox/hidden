<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <sphera-input v-model="boxName" label="Название группы" />
      </v-col>
      
      <v-col>
        <sphera-action-btn @click="addItem()">Добавить участника</sphera-action-btn>  

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
      items: [{id: 0, name: ''}] as any[],
      lastId: 1,
      http: new this.$http(),
      boxName: 'Коробочка',
    };
  },
  methods: {
    addItem() {
      this.items.push({id: this.lastId });
      this.lastId++;
    },
    async onDraftAll() {
        const result = this.http.post('customer/postlist', {items: this.items, box: this.boxName});
    },

    async onDraft() {
      this.items.forEach(element => {
        const result = this.http.post('customer', {id: element.id, name: element.name, email: element.email});
      });
    },
  },
});
</script>