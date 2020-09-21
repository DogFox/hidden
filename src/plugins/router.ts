import Vue from 'vue';
import VueRouter from 'vue-router';
import Order from '../views/orders/index.vue';
import Client from '../views/clients/index.vue';
import Account from '../views/accounts/index.vue';
import Test from '../views/test/index.vue';

Vue.use(VueRouter);


const routes = [
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
