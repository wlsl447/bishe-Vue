<!--  -->
<template>
<div>
    <h1>1231234</h1>
<el-row >
  <el-col :span="8" style="background-color:aqua border-radius: 5px" ><div class="grid-content bg-purple"></div>
  <h3>123</h3>
  <!-- <h1>{{this.title}}</h1>
  <h1>{{title}}</h1> -->

  </el-col>
  <el-col :span="16"><div class="grid-content bg-purple-light"></div>
    <h1>111</h1>
    <!-- <h2>{{data1.time}}</h2> -->
  </el-col>
</el-row>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

import { h } from 'vue';

export default {
//import引入的组件需要注入到对象中才能使用
components: { h },
data() {
//这里存放数据
return {
    // data1:{
        noticeId:'',
        title:'',
        time:'',
        content:'',
        state:'',
    // }
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    // getNotice() {
    //   // console.log(this.user)
    //   this.$axios
    //     .get("/getnotice", {})
    //     .then(( {data} ) => {
    //       console.log(data);
    //     //   if (data.code === 200) {
    //     //     this.total = data.data.length;
    //     //     this.tableData = data.data;
    //     //     this.tableData = data.data.splice(
    //     //       (this.page - 1) * this.size,
    //     //       this.size
    //     //     );
    //     //   }
    //     })
    //     .catch((resp) => {
    //       //除了请求失败的情况
    //       console.log("请求失败：" + resp.status + "," + resp.statusText);
    //     });
    // },
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
    // this.getNotice();
//这里一般写函数的声明。页面创建完成时，除非此函数
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>

</style>