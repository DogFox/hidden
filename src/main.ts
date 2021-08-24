import Vue from 'vue';
import App from './App.vue';
import router from './plugins/router';
import { store } from './plugins/store/index';
import { StateStorage } from './plugins/storage/index';
import { ApiSphera } from './plugins/http';
import './prepareComponents';

import Vuetify, {
  VBtn,
  VList,
  VListItem,
  VListItemIcon,
  VListItemContent,
  VListItemTitle,
  VIcon,
  VMenu,
  VExpansionPanel,
  VExpansionPanelHeader,
  VExpansionPanelContent,
  VCheckbox,
  VCard,
  VCardText,
  VCardTitle,
  VContainer,
  VCol,
  VRow,
  VDialog,
  VImg,
  VProgressCircular,
  VSubheader,
  VTimeline,
  VSlideYTransition,
  VSimpleCheckbox,
  VTab,
  VTabItem,
  VTooltip,
  VOverlay,
  VScrollXTransition,
  VSnackbar,
  // @ts-ignore
} from 'vuetify/lib';
import VuetifyToast from 'vuetify-toast-snackbar';
import lsWatcher from 'vue-storage-watcher';
import ru from 'vuetify/src/locale/ru';
import '@mdi/font/css/materialdesignicons.css'; // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css'; // Ensure you are using css-loader
import 'roboto-fontface/css/roboto/roboto-fontface.css'; // шрифт Material Design
import './assets/custom.scss'; // Кастомные стили

const theme = {
  themes: {
    light: {
      // primary: '#00bcd4',
      primary: '#ff3535',
      secondary: '#4caf50',
      accent: '#8bc34a',
      error: '#f44336',
      warning: '#ffc107',
      info: '#cddc39',
      success: '#03a9f4',
    },
  },
};

const opts: any = {
  lang: { locales: { ru }, current: 'ru' },
  icons: {
    iconfont: 'mdi',
    values: {},
  },
  theme,
};
const vueObj = new Vuetify(opts);
const objs = { vuetify: vueObj };
Vue.use(Vuetify, {
  // iconfont: 'mdi',
  components: {
    VBtn,
    VList,
    VListItem,
    VListItemIcon,
    VListItemContent,
    VListItemTitle,
    VIcon,
    VMenu,
    VExpansionPanel,
    VExpansionPanelHeader,
    VExpansionPanelContent,
    VCheckbox,
    VCard,
    VCardText,
    VCardTitle,
    VContainer,
    VCol,
    VRow,
    VDialog,
    VImg,
    VProgressCircular,
    VSubheader,
    VTimeline,
    VSlideYTransition,
    VSimpleCheckbox,
    VTab,
    VTabItem,
    VTooltip,
    VOverlay,
    VScrollXTransition,
    VSnackbar,
  },
});

Vue.use(VuetifyToast, { $vuetify: vueObj.framework, color: 'primary' }); // тосты
// реактивное хранилище
// Vue.use(lsWatcher); нельзя использовать внутри вьюкса
Vue.config.productionTip = false;
Vue.prototype.$http = ApiSphera;

// локальный смотрит во вьюкс
store.subscribe(StateStorage.subscriber);
// Загружаем информацию из local storage
StateStorage.loadState('common');

new Vue({
  router,
  store,
  ...objs,
  render: h => h(App),
}).$mount('#app');
