import Axios, { AxiosResponse } from 'axios';
export const axios = Axios.create({
});

const BASE_URL = 'http://127.0.0.1:8000/api/';
export class ApiSphera {
  async get(url: string) {

    const targetUrl = BASE_URL + url;
    return axios.get(targetUrl).then(response => {
      return response.data;
    });
  }
  async post(url: string, item: object) {

    const targetUrl = BASE_URL + url;
    return axios.post(targetUrl + '/', item).then(response => {
      return response.data;
    });
  }
  async put(url: string, item: object) {

    const targetUrl = BASE_URL + url;
    return axios.put(targetUrl, item).then(response => {
      return response.data;
    });
  }
  async delete(url: string, id: number) {

    const targetUrl = BASE_URL + url + '/' + id;
    return axios.delete(targetUrl).then(response => {
      return response.data;
    });
  }
}