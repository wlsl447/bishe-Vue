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
          <el-dropdown-menu slot="dropdown">
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
      <div class="userhandle">
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
      </div>
    </el-menu>
    <!-- </el-col> -->

    <!-- 登录用户信息 -->
    <!-- <el-col :span="6" class="userhandle"> -->
    <!-- <el-button @click="logOut">注销登录</el-button> -->
    <!-- </el-col> -->
    <!-- </el-row> -->

    <div>
      <el-dialog
        title="修改个人信息"
        :visible.sync="dialogVisible"
        width="60%"
        :before-close="handleClose"
      >
        <el-form :model="form"  ref="form" label-width="150px">
          <div class="updateinfo">
            <div class="left">
              <el-form-item label="头像" prop="avatar"> </el-form-item>
              <el-form-item label="账号密码" prop="useraccount">
                <el-input v-model="form.useraccount"></el-input>
              </el-form-item>
              <el-form-item label="昵称" prop="nickname">
                <el-input v-model="form.nickname"></el-input>
              </el-form-item>
              <el-form-item label="年龄" prop="age">
                <el-input v-model="form.age"></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="sex">
                <el-switch
                  v-model="form.sex"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-text="男"
                  inactive-text="女"
                  :active-value="1"
                  :inactive-value="0"
                >
                </el-switch>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="form.email"></el-input>
              </el-form-item>
            </div>
            <div class="right">
              <el-form-item label="用户编号" prop="id">
                <el-input v-model="form.id" disabled></el-input>
              </el-form-item>
              <el-form-item label="账号" prop="account">
                <el-input v-model="form.account" disabled></el-input>
              </el-form-item>
              <el-form-item label="地区" prop="area">
                <el-input v-model="form.area"></el-input>
              </el-form-item>
              <el-form-item label="兴趣爱好" prop="hobby">
                <el-input v-model="form.hobby"></el-input>
              </el-form-item>
              <el-form-item label="职业" prop="work">
                <el-input v-model="form.work"></el-input>
              </el-form-item>
              <el-form-item label="个性签名" prop="design">
                <el-input v-model="form.design"></el-input>
              </el-form-item>
              <el-form-item label="手机号码" prop="mobilePhoneNumber">
                <el-input v-model="form.mobilePhoneNumber"></el-input>
              </el-form-item>
            </div>
          </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="submit">提 交</el-button>
        </span>
      </el-dialog>
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
    return {
      dialogVisible: false,
      form:{
        useraccount:'',
        username:'',
        userpassword:'',
        usergender:'',
        usernuit:'',
        userphone:'',
        useremail:'',
      }
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
    userGroup2() {
      this.dialogVisible = true
    },
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
.userhandle {
  text-align: right;
  padding: 15px 50px 15px 20px;
  color: aliceblue;
}
.el-dropdown-link {
  color: aliceblue;
}
</style>