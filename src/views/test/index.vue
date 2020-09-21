<template>
  <v-container>
    <v-row>
      <v-col> </v-col>
    </v-row>
    <v-row>
      <v-col>
        <sphera-date-field label="Выберите дату" v-model="date"></sphera-date-field>
      </v-col>
      {{ date }}
    </v-row>
    <!-- <v-row>
      <v-col>
        <v-file-input v-model="file" ref="file" label="файл" type="file" v-on:change="handleFileUpload()"></v-file-input>
      </v-col>
    </v-row>
    <v-btn v-on:click="submitFile()">Submit</v-btn> -->
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      file: '',
      data: new FormData(),
      date: null,
    };
  },
  methods: {
    submitFile() {
      new this.$http()
        .post('upload', this.data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error.response);
        });
    },
    handleFileUpload() {
      this.data.append('file', this.file);
      this.data.append('name', this.file.name);
    },
  },
});
</script>