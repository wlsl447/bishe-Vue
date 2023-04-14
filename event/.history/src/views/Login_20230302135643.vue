<template>
  <div class="login-box">
    <!-- 通过:rules="loginFormRules"来绑定输入内容的校验规则 -->
    <!-- <button @click="loginb">数据222</button>
      <button @click="loginc">数据555</button> -->
    <span class="login-title">校园赛事管理系统</span>
    <el-form
      :rules="loginFormRules"
      ref="loginForm"
      :model="loginForm"
      label-position="right"
      label-width="auto"
      show-message
    >
      <span class="login-title">欢迎登录</span>
      <div style="margin-top: 5px"></div>
      <el-form-item label="用户名" prop="loginName">
        <el-col :span="22">
          <el-input type="text" v-model="loginForm.account"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="密码" prop="loginPassword">
        <el-col :span="22">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loginSubmit('loginForm')"
          >登录</el-button
        >
        <el-button type="primary" @click="onRegit('loginForm')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
export default {

  data() {
    return {
      loginForm: {
        account: "",
        username:"",
        password: "",
      },
      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      loginFormRules: {
        account: [{ required: true, message: "账号不可为空", trigger: "blur" }],
        password: [
          { required: true, message: "密码不可为空", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    loginSubmit(formName) {
      // 为表单绑定验证功能
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 使用 vue-router 路由到指定页面，该方式称之为编程式导航 /todetails1
          console.log("to loginSuccess");
          //   this.$router.replace("/loginSuccess");
        } else {
          return false;
        }
        this.$axios //用this.$axios就代表main.js中的Vue.prototype.$axios = axios的axios
          .post("/user/login", {
            //用post方法传 输入框输入的用户名和密码
            account: this.loginForm.account,
            password: this.loginForm.password,
          })
          .then((data) => {
            //回调函数当post成功后执行
            console.log(data.data);
            this.loginForm.username = data.data.data.username;
            // console.log(this.loginForm.username);
            //回调方法里的this，只是调用方法体里面的参数，所以需要在外面将this定义好 JQuery
            if (data.data.code === 200) {
              // JSON.stringify将要序列化成 一个JSON 字符串的值，将值存在sessionStorage读取或保存数据中，设置key值为user
              sessionStorage.setItem(
                "user",
                JSON.stringify({
                  account: this.loginForm.account,
                  username: this.loginForm.username,
                })
              );
              Cookies.set('username',this.loginForm.username)
              console.log(sessionStorage);
              // console.log(that.username);
              // if (that.value === "admin") {
              //   //路由的跳转－－正常跳转就行
              // } else if (that.value === "普通用户") {
              //   this.$router.replace("/");
              //   //路由的跳转
              // }
            } else if (data.data.code === 500) {
              alert("用户名或者密码错误，请重新输入");
              // window.location.href = 'fail.html'
            }
            // if (data.data.code === 200) {
            //   this.$router.replace("/");
            // }
            // if (data.data.code === 400) {
            // }
          });
      });
    },
    logina() {
      this.$axios
        .get("/todetails1", (res) => {
          //地址是get请求地址
          console.log(res);
        })
        .then(function (res) {
          //当请求完成时候执行then回调函数
          console.log(res);
        })
        .catch((resp) => {
          //除了请求失败的情况
          console.log("请求失败：" + resp.status + "," + resp.statusText);
        });
    },
  },
};
</script>
  <style scoped>
.login-box {
  border: 1px solid #dcdfe6;
  width: 350px;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px palegreen;
}
.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #66cd00;
  font-size: 30px;
  font-weight: bold;
}
</style>
    
    