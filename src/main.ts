import Vue from 'vue';
import App from './App.vue';
import router from './plugins/router';
import store from './plugins/store';
import vuetify from './plugins/vuetify';
import { ApiSphera } from './plugins/http';
import './prepareComponents';

Vue.config.productionTip = false;
Vue.prototype.$http = ApiSphera;

new Vue({
  router,
  store,
  // @ts-ignore
  vuetify,
  render: h => h(App),
}).$mount('#app');
