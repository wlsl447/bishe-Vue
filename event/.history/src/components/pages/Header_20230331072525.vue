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
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
      </el-submenu>
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
        title="个人信息"
        :visible.sync="dialogVisible"
        width="60%"
        :before-close="handleClose"
      >
        <el-form :model="form" ref="form" label-width="150px">
          <div class="updateinfo">
            <div class="left">
              <el-form-item label="账号" prop="useraccount">
                <el-input
                  v-model="form.useraccount"
                  :disabled="isInput"
                ></el-input>
              </el-form-item>
              <el-form-item label="名字" prop="username">
                <el-input
                  v-model="form.username"
                  :disabled="isInput"
                ></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="usergender">
                <el-radio
                  v-model="form.usergender"
                  label="男"
                  :disabled="isInput"
                  >男</el-radio
                >
                <el-radio
                  v-model="form.usergender"
                  label="女"
                  :disabled="isInput"
                  >女</el-radio
                >
              </el-form-item>
              <el-form-item label="邮箱" prop="useremail">
                <el-input v-model="form.useremail"></el-input>
              </el-form-item>
            </div>
            <div class="right">
              <!-- <el-form-item label="用户编号" prop="id">
                <el-input v-model="form.id" disabled></el-input>
              </el-form-item> -->
              <el-form-item label="所在大学" prop="userunit">
                <el-input
                  v-model="form.userunit"
                  :disabled="isInput"
                ></el-input>
              </el-form-item>
              <el-form-item label="手机号码" prop="userphone">
                <el-input v-model="form.userphone"></el-input>
              </el-form-item>
            </div>
          </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose()">取 消</el-button>
          <el-button type="primary" @click="submit()">完成</el-button>
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
      isInput: true,
      form: {
        useraccount: "",
        username: "",
        userpassword: "",
        usergender: "",
        userunit: "",
        userphone: "",
        useremail: "",
      },
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
      this.dialogVisible = true;
      // console.log(this.user.id)

      this.$axios
        .get("/user/info")
        .then(({ data }) => {
          console.log(data);
          if (data.code === 200) {
            this.form = data.data;
          }
        })
        .catch((resp) => {
          //除了请求失败的情况
          console.log("请求失败：" + resp.status + "," + resp.statusText);
        });
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
    submit() {},
    handleClose() {
      this.dialogVisible = false;
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