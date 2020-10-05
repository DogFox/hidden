import Vue from 'vue';
import Vuex from 'vuex';
import systemStore from './systemStore'; // состояние бэкэнда

Vue.use(Vuex);

const state = {};

const store = new Vuex.Store({
  modules: {
    systemStore,
  },
  state,
});

export { store };
