import Vue from '../../../node_modules/vue/dist/vue.common';
import VueRouter from '../../../node_modules/vue-router/dist/vue-router.js';
import Home from './components/home.vue';
import Chat from './components/chat.vue';
import Profile from './components/profile.vue';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/chat', component: Chat },
    { path: '/profile', component: Profile }
  ]
})