import Vue from 'vueCommon';
import Vuex from 'vuex';
import App from './app.vue';
import Store from './store';
import * as Utils from './utils/filters';

Vue.use(Vuex);
Vue.filter('date', Utils.dateFilter);

new Vue({
  el: '#app',
  store: new Vuex.Store(Store),
  components: { App },
  template: `<app></app>`
});

