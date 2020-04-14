import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import './assets/icon/iconfont.css'

import TreeTable from 'vue-table-with-tree-grid'

import axios from 'axios'

//请求的根类径
axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'
//拦截器 设置
axios.interceptors.request.use(config => {
  console.log(config);
  config.headers.Authorization = window.sessionStorage.getItem('token');
  return config;
})

Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.component('tree-table', TreeTable)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')