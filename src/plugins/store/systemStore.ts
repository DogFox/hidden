import Vue from 'vue';
import { Module, MutationTree, GetterTree, ActionTree } from 'vuex';
// import { store } from './index';
// import { stackDate } from '../utils/helpers';
// import { stackAppEmitter } from '../utils/emitters';
// import { StackApi } from '../middleware/StackApi'; // для общения с бэкэндом

export interface SystemState {
  sessionToken: string | undefined; // текущий токен
  user: string; // Логин
}

const state: SystemState = {
  sessionToken: '',
  user: '',
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
    // if (!token && payload.login) {
    //   commit('SET_LOGIN', payload.login);
    //   const http = new StackApi();
    //   token = await http.getToken(payload.login, payload?.password || '', !!payload.force);
    // }
    if (token) {
      commit('SET_TOKEN', token);
      // Проверим, а валидный ли до сих пор токен, если аутентифицируемся через него
      // if (payload?.token) {
      //   await dispatch('checkSystemState');
      // }
      // await stackAppEmitter.emitAsync('APP_USER_SIGN_IN', store);
      return true;
    }
    return false;
  },
  // Разлогин
  async SIGN_OUT({ commit }) {
    commit('SET_TOKEN', '');
    // await stackAppEmitter.emitAsync('APP_USER_SIGN_OUT', store);
    // await new StackApi().logout();
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
