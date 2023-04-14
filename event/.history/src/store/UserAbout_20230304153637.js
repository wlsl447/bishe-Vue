import axios from "../common/myAxios.js"

export default {

  namespaced: true,//开启命名空间
  state: {
    user: {
      id: null,
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
      axios.post("/user/getLoginUser").then(({ data }) => {
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