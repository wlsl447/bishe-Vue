// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import dayjs from 'dayjs'
import filter from './common/filter'
Vue.config.productionTip = false
axios.defaults.baseURL= 'http://localhost:8082'//设置一个基础请求地址


 
for (const key in filter) {
    Vue.filter(key,filter[key]);
}
Vue.prototype.$axios= axios
Vue.use(ElementUI)
Vue.prototype.$dayjs= dayjs
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
