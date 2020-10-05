import Axios, { AxiosResponse } from 'axios';
import { store } from './store/index';
export const axios = Axios.create({
});

const BASE_URL = 'http://127.0.0.1:8000/api/';

interface AiHttpRequest {
  Authorization?: string;
}
export class ApiSphera {
  
  private headers = {} as any;
  
  async get(url: string) {
    const token = store.getters.getToken();
    if (token) {
      this.headers.Authorization = 'Token ' + token;
    }
    const targetUrl = BASE_URL + url;
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