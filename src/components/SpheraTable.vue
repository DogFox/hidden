<template>
  <div>
    <v-data-table dense :headers="headersList" :items="items" class="elevation-1" hide-default-header>
      <template v-slot:top>
        <sphera-table-toolbar :description="description" @click="initialize" />
      </template>
      <template v-slot:header="{ props: { headers: vheaders } }">
        <thead>
          <tr>
            <template v-for="header in vheaders">
              <th :key="header.text">
                <v-row no-gutters align="center" style="flex-wrap:nowrap">
                  <span style="white-space: pre">{{ header.text }}</span>
                </v-row>
              </th>
            </template>
          </tr>
        </thead>
      </template>

      <template v-slot:item.action="{ item }">
        <v-icon class="mr-2" @click="editItem(item)">edit</v-icon>
        <v-icon @click="deleteItem(item)">delete</v-icon>
      </template>

      <template v-slot:no-data>
        <v-btn color="primary" @click="fetchData">Reset</v-btn>
      </template>
    </v-data-table>
    <slot v-if="modalDialogVisible" :item="record" name="modal" :slotEmit="eventBus" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'SpheraTable',
  props: {
    headers: { type: Array, required: true },
    rowsCount: { type: Number, default: 5 },
    path: { type: String, required: true },
    description: { type: String, default: '' },
  },
  data() {
    return {
      items: [],
      modalDialogVisible: false,
      color: 'primary',
      editedIndex: -1,
      record: {} as any,
      http: new this.$http(),
    };
  },
  created() {
    this.fetchData();
  },
  computed: {
    headersList(): any {
      const heads = this.headers.slice();
      heads.push({ text: 'action', value: 'action', width: '100px' });
      return heads;
    },
  },
  methods: {
    initialize() {
      this.record = Object.assign({}, {});
      this.modalDialogVisible = true;
    },
    async fetchData() {
      this.items = await this.http.get(this.path);
    },
    async save() {
      if (this.editedIndex > -1) {
        const result = await this.http.put(this.path, this.record);
      } else {
        const result = await this.http.post(this.path, this.record);
      }
      this.fetchData();
      this.close();
    },
    async deleteItem(item: any) {
      const index = item.id;
      if (confirm('Вы уверены что хотите удалить запись?')) {
        const result = await this.http.delete(this.path, index);
        this.fetchData();
      }
    },
    eventBus(payload: any) {
      switch (payload) {
        case 'close':
          this.close();
          break;
        case 'save':
          this.save();
          break;
        default:
          break;
      }
    },
    editItem(item: any) {
      // TODO
      // @ts-ignore
      this.editedIndex = this.items.indexOf(item);
      this.record = Object.assign({}, item);
      this.modalDialogVisible = true;
    },
    close() {
      this.modalDialogVisible = false;
      setTimeout(() => {
        this.record = Object.assign({}, this.record);
        this.editedIndex = -1;
      }, 300);
    },
  },
});
</script>
