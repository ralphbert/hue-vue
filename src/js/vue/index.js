import Vue from '../../../node_modules/vue/dist/vue.common';
import App from './components/app.vue';
import store from './store';
import router from './router';
import Filters from './utils/filters';

Vue.filter('date', Filters.date);

new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: `<app></app>`
});