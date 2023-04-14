// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import axios from './common/myAxios.js'
import dayjs from 'dayjs'

import Home from "@/components/home"
import UserCT from '@/components/UserCT'
import MyCompotition from '@/views/MyCompotition'
import Header from '@/components/pages/Header'
import Login from '@/views/Login'
import store from './store/index.js'



Vue.config.productionTip = false
axios.defaults.baseURL= 'http://localhost:8082'//设置一个基础请求地址



Vue.prototype.$axios= axios
Vue.use(ElementUI)
Vue.prototype.$dayjs= dayjs
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App,Home,UserCT,MyCompotition,Header,Login},
  template: '<App/>'
  
})