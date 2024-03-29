import Vue from 'vue';
import { Module, MutationTree, GetterTree, ActionTree } from 'vuex';
import { ApiSphera } from '../http';
import router from '../router';

export interface SystemState {
  sessionToken: string | undefined; // текущий токен
  user: string; // Логин
  BACKEND_STATE_INTERVAL: number; // интервал опроса состояния бэкэнда
}

const state: SystemState = {
  sessionToken: '',
  user: '',
  BACKEND_STATE_INTERVAL: 5000,
};

// Геттеры
const getters: GetterTree<SystemState, any> = {
  // текущий токен
  getToken: (state: SystemState) => () => {
    return state.sessionToken;
  },

  // аутентифицирован ли пользователь
  isAuth: (state: SystemState) => () => {
    return !!state.sessionToken;
  },

  getLogin: (state: SystemState) => () => {
    return state.user;
  },
  // интервал опроса состояния бэкэнда
  getBackendStateInterval: (state: SystemState) => () => {
    return state.BACKEND_STATE_INTERVAL;
  },
};

const mutations: MutationTree<SystemState> = {
  // устанавливаем токен
  SET_TOKEN(state, sessionToken: string) {
    state.sessionToken = sessionToken;
  },
  // Login текущего пользователя
  SET_LOGIN(state: SystemState, login: string) {
    state.user = login;
  },

  SET_BACKEND_STATE_INTERVAL(state: SystemState, interval: number) {
    state.BACKEND_STATE_INTERVAL = interval;
  },
};

interface StackAuthData {
  token?: string;
  login?: string;
  password?: string;
  force?: boolean;
}
const actions: ActionTree<SystemState, any> = {
  // Метод авторизации пользователя
  async SIGN_IN({ commit, dispatch }, payload: StackAuthData) {
    const token = payload?.token;
    commit('SET_LOGIN', payload?.login);
    if (token) {
      commit('SET_TOKEN', token);
      return true;
    }
    return false;
  },
  // Разлогин
  async SIGN_OUT({ commit }) {
    commit('SET_TOKEN', '');
    router.push('/authentication');
    return true;
  },
  async checkSystemState({ commit, state, getters }): Promise<boolean> {
    const api = new ApiSphera();
    try {
      const rec = await api.getSystemState();
      if (rec) {
        console.log(rec);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
    return true;
  },
};

const systemState: Module<SystemState, any> = {
  state,
  getters,
  mutations,
  actions,
};

export default systemState;
