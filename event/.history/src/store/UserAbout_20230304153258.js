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
  actions: { jia(context,value){
		// console.log('actions中的jia被调用了',miniStore,value)
		context.commit('JIA',value)
	}, },
  mutations: {  },
}