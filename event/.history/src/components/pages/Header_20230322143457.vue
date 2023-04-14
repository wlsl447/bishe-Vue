<!--  -->
<template>
  <div>
    <!-- <el-row :gutter="4" type="flex" justify="space-between"> -->
      <!-- 用户导航 -->
      <!-- <el-col :span="18"> -->
        <el-menu
          :default-active="$route.path"
          class="el-menu-demo"
          router
          mode="horizontal"
          v-show="user.usertype === 1"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="/index">首页</el-menu-item>
          <el-menu-item index="/competition">赛事信息</el-menu-item>
          <el-menu-item index="/userCT">我的比赛·队伍</el-menu-item>
          <el-menu-item index="/recruitteam">组队·招募</el-menu-item>
          <el-menu-item index="/award">获奖通知</el-menu-item>
          <el-menu-item index="/notice">系统公告</el-menu-item>

          <div class="userhandle">
            <span>{{ user.username ? user.username : "未登录" }}</span>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              个人信息<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown" >
              <el-dropdown-item command="userGroup">修改密码</el-dropdown-item>
              <el-dropdown-item command="userGroup2">个人信息</el-dropdown-item>
              <el-dropdown-item command="userGroup3">投诉建议</el-dropdown-item>
              <el-dropdown-item command="userGroup4">注销登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          </div>

        </el-menu>
        <el-menu
          :default-active="$route.path"
          class="el-menu-demo"
          router
          mode="horizontal"
          v-show="user.usertype === 0"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="/index">首页</el-menu-item>
          <el-menu-item index="/competitionManager">赛事管理</el-menu-item>
          <el-menu-item index="/placeManager">场地管理</el-menu-item>
          <el-menu-item index="/awardManager">获奖管理</el-menu-item>
          <el-menu-item index="/noticeManager">系统公告管理</el-menu-item>
          <el-menu-item index="/adviceManager">投诉/建议管理</el-menu-item>
        </el-menu>
      <!-- </el-col> -->

      <!-- 登录用户信息 -->
      <!-- <el-col :span="6" class="userhandle"> -->
        <div >
          <span>{{ user.username ? user.username : "未登录" }}</span>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              个人信息<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="userGroup">修改密码</el-dropdown-item>
              <el-dropdown-item command="userGroup2">个人信息</el-dropdown-item>
              <el-dropdown-item command="userGroup3">投诉建议</el-dropdown-item>
              <el-dropdown-item command="userGroup4">注销登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <!-- <el-button @click="logOut">注销登录</el-button> -->
        </div>
      <!-- </el-col> -->
    <!-- </el-row> -->
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
    return {
      dialogVisible: false,
    };
  },
  methods: {
    handleCommand(cmditem) {
      if (!cmditem) {
        this.$message("菜单选项缺少command属性");
        return;
      }
      switch (cmditem) {
        case "userGroup":
          this.userGroup();
          break;
        case "userGroup2":
          this.userGroup2();
          break;
        case "userGroup3":
          this.userGroup3();
          break;
        case "userGroup4":
          this.logOut();
          break;
      }
    },
    userGroup() {
      this.$router.push("/changePassword");
    },
    userGroup2() {},
    userGroup3() {
      if (this.user.usertype === 1) {
        this.$router.push("/advice");
      }
      if (this.user.usertype === 0) {
        this.$router.push("/adviceManager");
      }
    },
    logOut() {
      localStorage.clear();
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    showLogout() {},
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
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
.userhandle{
  text-align: right;
  padding: 10px,10px,10px,10px;
}
</style>