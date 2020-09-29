import Vue from 'vue';
import VueRouter from 'vue-router';
import Order from '../views/orders/index.vue';
import Client from '../views/clients/index.vue';
import Account from '../views/accounts/index.vue';
import Draft from '../views/draft/index.vue';
import MyDrafts from '../views/mydrafts/index.vue';
import draftid from '../views/mydrafts/draftid.vue';
import Test from '../views/test/index.vue';

Vue.use(VueRouter);
const routes = [
  {
    path: '/draft',
    name: 'draft',
    component: Draft,
  },
  {
    path: '/mydrafts',
    name: 'mydrafts',
    component: MyDrafts,
  },
  {
    path: '/mydrafts/:draftid',
    name: 'draftid',
    component: draftid,
    props: true,
  },
  {
    path: '/orders',
    name: 'order',
    component: Order,
  },
  {
    path: '/clients',
    name: 'client',
    component: Client,
  },
  {
    path: '/accounts',
    name: 'account',
    component: Account,
  },
  {
    path: '/test',
    name: 'test',
    component: Test,
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: 'about' */ '../views/About.vue')
  // }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
