import Vue from 'vue';
// @ts-ignore
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


import '@mdi/font/css/materialdesignicons.css'; // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css'; // Ensure you are using css-loader

Vue.use(Vuetify, {
    iconfont: 'mdi',
    components: {
        VSnackbar,
    },
});
Vue.use(VuetifyToast);


// export default new Vuetify({});
