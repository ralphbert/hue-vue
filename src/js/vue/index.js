let Vue = require('vueCommon');
let App = require('./app.vue');
let Utils = require('./utils/filters');

Vue.filter('date', Utils.dateFilter);

new Vue({
  el: '#app',
  components: { App },
  template: `<app></app>`
});