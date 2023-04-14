<!--  -->
<template>
  <div>
    <el-menu
      :default-active="$route.path"
      class="el-menu-demo"
      router
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="/index">首页</el-menu-item>
      <el-menu-item index="/competition">赛事信息</el-menu-item>
      <el-menu-item index="/userCT">我的比赛·队伍</el-menu-item>
      <el-menu-item index="/place">组队·招募</el-menu-item>
      <el-submenu index="5">
        <template slot="title">人员信息</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
      </el-submenu>
      <el-menu-item index="6">获奖通知</el-menu-item>
      <el-menu-item index="7">系统公告</el-menu-item>

      <div>
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </div>
    </el-menu>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    return {
    };
  },
  methods: {
    handleSelect(data) {
      this.$router.push({ path: data });
    },
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    //这里一般写函数的声明。页面创建完成时，除非此函数
  },
  
};
</script>
<style scoped>

</style>