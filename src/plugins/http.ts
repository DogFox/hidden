import Vue from 'vue';
import Axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { store } from './store/index';
export const axios = Axios.create({
});
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

// const BASE_URL = process.env.VUE_APP_API_BASE_URL;
const BASE_URL = 'http://95.183.35.164:8081/api/';
export class ApiSphera {
  private headers = {} as any;

  setTokenHeader() {
    const token = store.getters.getToken();
    if (token) {
      this.headers.Authorization = 'Token ' + token;
    }
  }

  async get(url: string, params?: any) {
    this.setTokenHeader();
    const config = Object.assign({}, { headers: this.headers }, { params }) as AxiosRequestConfig;
    const targetUrl = BASE_URL + url;
    return axios.get(targetUrl, config).then(response => {
      return response.data;
    });
  }

  async getSystemState() {
    this.setTokenHeader();
    const targetUrl = BASE_URL + 'check_system/';
    return axios.get(targetUrl, { headers: this.headers }).then(response => {
      return response.data;
    });
  }

  async post(url: string, item: object) {
    this.setTokenHeader();
    const targetUrl = BASE_URL + url;
    return axios.post(targetUrl + '/', item, { headers: this.headers }).then(response => {
      return response.data;
    });
  }

  async put(url: string, item: object) {
    this.setTokenHeader();
    const targetUrl = BASE_URL + url;
    return axios.put(targetUrl + '/', item, { headers: this.headers }).then(response => {
      return response.data;
    });
  }

  async delete(url: string, id: number) {
    this.setTokenHeader();
    const targetUrl = BASE_URL + url + '/' + id;
    return axios.delete(targetUrl, { headers: this.headers }).then(response => {
      return response.data;
    });
  }
}

// Add a response interceptor
axios.interceptors.response.use((response: AxiosResponse) => {
  // Do something with response data
  // console.log(response.data);
  return response;
}, error => {
  const error_code = error.response.status;
  const error_data = error.response.data;
  // console.log('http_err', error_code);
  // console.log('http_err', error.response);
  if (error_code) {
    switch (+error_code) {
      // ошибка аутентификации
      case 401:
        store.dispatch('SIGN_OUT'); // окно аутентификации
        Vue.prototype.$toast(error_data.detail, { color: 'error' });
        break;
      case 400: {
        let mess = '';
        for (const attr in error_data) {
          mess += error_data[attr] + ' ';
        }
        Vue.prototype.$toast(mess, { color: 'error' });
        break;
      }
      default:
        console.log('response error:', error_data, error_code);
        Vue.prototype.$toast(error_data.error, { color: 'error' });
        // store.commit('WRITE_DEBUG_LOG', { type: 'http.interceptor.taskerror', info: JSON.stringify(err) });
    }
  }
  // Do something with response error
  return Promise.reject(error);
});