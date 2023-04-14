// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import dayjs from 'dayjs'

import Home from "@/components/home"
import UserCT from '@/components/UserCT'
import MyCompotition from '@/views/MyCompotition'
import Header from '@/components/pages/Header'
import Login from '@/views/Login'



Vue.config.productionTip = false
axios.defaults.baseURL= 'http://localhost:8082'//设置一个基础请求地址



Vue.prototype.$axios= axios
Vue.use(ElementUI)
Vue.prototype.$dayjs= dayjs
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App,Home,UserCT,MyCompotition,Header,Login},
  template: '<App/>',
  data() {
    return {
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      dialogVisible: false,
      tableData: [
        {
          id: "",
          cpname: "",
          cpstime: "",
          cpetime: "",
          cpintro: "",
          plid: 1,
          teamType: 0,
          cplevel: "",
          cpstate: "",
          cptype: 1,
          typeName: "",
          address: "",
          room: "",
        },
      ],
      activeIndex: "1",
      activeIndex2: "1",
      loginForm: {
        account: "",
        password: "",
      },
      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      loginFormRules: {
        account: [{ required: true, message: "账号不可为空", trigger: "blur" }],
        password: [
          { required: true, message: "密码不可为空", trigger: "blur" },
        ],
      },
    };
  },
})
