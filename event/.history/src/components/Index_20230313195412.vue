<!--  -->
<template>
  <div>
    
    <div id="building">
      <span id="title">欢迎使用校园赛事管理系统</span>
    </div>
  </div>
  
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { mapState } from "vuex";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  //监听属性 类似于data概念
  computed: {
    ...mapState("userAbout", ["user"]),
  },
  data() {
    //这里存放数据
    return {};
  },
};
</script>
<style>

#title{
  text-align: center;
}
#building{
background:url("../assets/RC.jpg");
width:100%;
height:100%;
position:fixed;
background-size:100% 100%;
text-align: center;
font-size: 30px;
}
</style>