import axios from "../common/myAxios.js"

export default{

    namespaced:true,//开启命名空间
  state:{ 
    user:{
        id:null,
        useraccount:'',
        username:"",
        usertype:"",
        useremail:"",
        userphone:'',
        usergender:'',
    }
   },
  actions: { getUser(context,value){
		axios.post("/user/getLoginUser").then()
		context.commit('GETUSER',value)
	}, },
  mutations: { GETUSER(state,value){
		state.user=value
	} },
}