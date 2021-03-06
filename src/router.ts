import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Result from './views/Result.vue';
import History from './views/History.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    }, {
      path: '/history',
      name: 'history',
      component: History,
    }, {
      path: '/result/:resultId',
      name: 'result',
      component: Result,
    },
  ],
});
