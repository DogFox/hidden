import Vue from 'vue';
import Axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { store } from './store/index';
export const axios = Axios.create({
});

const BASE_URL = 'http://127.0.0.1:8000/api/';

export class ApiSphera {
  
  private headers = {} as any;
  
  async get(url: string, params?: any) {
    const token = store.getters.getToken();
    if (token) {
      this.headers.Authorization = 'Token ' + token;
    }
    const config = Object.assign({}, {headers: this.headers}, {params}) as AxiosRequestConfig;
    const targetUrl = BASE_URL + url;
    return axios.get(targetUrl, config).then(response => {
      return response.data;
    })
    .catch((error) => {
      console.log(Promise.reject(error));
    });
  }
  async getSystemState() {
    const token = store.getters.getToken();
    if (token) {
      this.headers.Authorization = 'Token ' + token;
    }
    const targetUrl = BASE_URL + 'check_system/';
    return axios.get(targetUrl, {headers: this.headers}).then(response => {
      return response.data;
    });
  }
  async post(url: string, item: object) {
    const token = store.getters.getToken();
    if (token) {
      this.headers.Authorization = 'Token ' + token;
    }

    const targetUrl = BASE_URL + url;
    return axios.post(targetUrl + '/', item, {headers: this.headers}).then(response => {
      return response.data;
    });
  }
  async put(url: string, item: object) {
    const token = store.getters.getToken();
    if (token) {
      this.headers.Authorization = 'Token ' + token;
    }

    const targetUrl = BASE_URL + url;
    return axios.put(targetUrl, item, {headers: this.headers}).then(response => {
      return response.data;
    });
  }
  async delete(url: string, id: number) {
    const token = store.getters.getToken();
    if (token) {
      this.headers.Authorization = 'Token ' + token;
    }

    const targetUrl = BASE_URL + url + '/' + id;
    return axios.delete(targetUrl, {headers: this.headers}).then(response => {
      return response.data;
    });
  }
}

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  console.log(response);
  
  return response;
}, function (error) {
  const error_code = error.response.status;
  if (error_code) {
    switch (+error_code) {
      // ошибка аутентификации
      case 401:
        store.commit('SET_TOKEN', ''); // окно аутентификации
        break;
      default:
        console.log('response error:', error.response.data, error_code);
        // store.commit('WRITE_DEBUG_LOG', { type: 'http.interceptor.taskerror', info: JSON.stringify(err) });
        // Vue.prototype.$toast(error.response.data.detail, { color: 'error' });
    }
  }
  // Do something with response error
  return Promise.reject(error);
});