import { store } from '../store';
export class StateStorage {
  private static storage = window.localStorage;

  // читает состояние из localstorage
  public static getState(taskPrefix?: string) {
    const task: string = taskPrefix || store.getters.getCurrentTask();
    const state = StateStorage.storage.getItem(task);
    return state ? JSON.parse(state) : {};
  }

  // Устанавливает key:value в localstorage
  public static setItem(key: string, value: any, section?: string) {
    const state: any = StateStorage.getState(section) || {};
    state[key] = value;
    const task: string = section || store.getters.getCurrentTask();
    StateStorage.storage.setItem(task, JSON.stringify(state));
  }

  // синхронизация в localstorage
  public static subscriber(mutation: any, state: any) {
    if (mutation.type === 'SET_USER_ID') {
      StateStorage.setItem('user_id', mutation.payload);
    }
    if (mutation.type === 'SET_TOKEN') {
      StateStorage.setItem('token', mutation.payload, 'common');
    }
  }

  // загрузка данных из localstorage
  public static async loadState(task: string) {
    const stateCommon = StateStorage.getState('common');
    if (stateCommon.token) {
      store.commit('SET_TOKEN', stateCommon.token);
    }
  }
}
