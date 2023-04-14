import axios from "../common/myAxios.js"

export default {

  namespaced: true,//开启命名空间
  state: {
    user: localStorage.user ? JSON.parse(localStorage.user) : {
      id: '',
      useraccount: '',
      username: "",
      usertype: "",
      useremail: "",
      userphone: '',
      usergender: '',
    }
  },
  actions: {
    getUser(context) {
      axios.get("/user/getLoginUser").then(({ data }) => {
        context.commit('GETUSER', data.data)
      })

    },
  },
  mutations: {
    GETUSER(state, value) {
      state.user = value
    }
  },
}