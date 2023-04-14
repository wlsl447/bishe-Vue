<!--  -->
<template>
  <div>
    <el-menu
      :default-active="$route.path"
      class="el-menu-demo"
      router
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      v-show="user.usertype === 1"
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

      
    </el-menu>

    <el-menu
      :default-active="$route.path"
      class="el-menu-demo"
      router
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      v-show="user.usertype === 3"
    >
      <el-menu-item index="/index">首页</el-menu-item>
      <el-menu-item index="/competition">赛事管理</el-menu-item>
      <el-menu-item index="/userCT">公告管理</el-menu-item>
      <el-menu-item index="/place">获奖管理</el-menu-item>
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
        <span>{{ user.username ? user.username : "未登录" }}</span>
        <!-- <button @click="exit()">注销</button> -->
      </div>
    </el-menu>
    <div>
        <span>{{ user.username ? user.username : "未登录" }}</span>
        <el-button @click="testD" >注销登录3</el-button> 
        <!-- <el-dropdown > -->
          <!-- <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu> -->
          <!-- <span style="color:aqua">注销登录</span> -->
          <!-- <button  @click="logout">注销</button> -->
        <!-- </el-dropdown> -->
        <!-- <button @click="exit()" v-show="showLogout()">注销</button> -->
        <!-- <el-dropdown-item divided @click.native="logout">
        <span style="color:aqua">注销登录</span>
      </el-dropdown-item> -->
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
  data() {
    return {};
  },
  methods: {
    testD(){
      console.log("test")
    },
    // handleSelect() {
    //   console.log(data)
    //   this.$router.push({ path: data });
    // },
    // handleSelect(key, keyPath) {
    //     console.log(key, keyPath);
    //   },
    // showMenu(){
    //   this.dialog_visible=true
    // }
    logOut() {
      console.log("zhuxiao")
      localStorage.clear()
			window.sessionStorage.clear()
			this.$router.push('/login')
    },
    showLogout() {},
  },
  //监听属性 类似于data概念
  computed: {
    ...mapState("userAbout", ["user"]),
    //   showUserName() {
    //     const user = JSON.parse(sessionStorage.getItem("user"));
    //     if (user === null) {
    //       this.$router.replace("/login");
    //       return null;
    //     }
    //     return user.username;
    //   },
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    let token = localStorage.getItem("token");
    if (token) {
      this.$store.dispatch("userAbout/getUser");
    }
  },
  mounted() {
    // handleSelect()
  },
};
</script>
<style scoped>
</style>