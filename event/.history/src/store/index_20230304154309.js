//该文件用于创建Vuex的store
//引入Vue
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//使用Vuex插件
Vue.use(Vuex)
import UserAbout from './UserAbout'
export default new Vuex.Store({
    modules: {
      UserAbout,
    }
  })