import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

import router from './router'
import api from './utils/api'
import requests from './utils/requests'
import storage from './utils/storage'

Vue.prototype.api = api;
Vue.prototype.req = requests;
Vue.prototype.stor = storage;

Vue.use(ElementUI, {size: 'small', zIndex: 3000});

Vue.prototype.bus = new Vue();

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
