import Vue from 'vue';
import App from './App.vue';
import router from './plugins/router';
import store from './plugins/store';
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
  // @ts-ignore
} from 'vuetify/lib';


const theme = {
  themes: {
    light: {
      primary: '#00bcd4',
      secondary: '#4caf50',
      accent: '#8bc34a',
      error: '#f44336',
      warning: '#ffc107',
      info: '#cddc39',
      success: '#03a9f4',
    },
  },
};

const objs = { vuetify: new Vuetify({theme}) };
Vue.use(Vuetify, {
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
  },
});

Vue.config.productionTip = false;
Vue.prototype.$http = ApiSphera;

new Vue({
  router,
  store,
  ...objs,
  render: h => h(App),
}).$mount('#app');
