<template>
  <div class="student-register">
    <h2>学生注册</h2>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="学号" prop="studentId">
        <el-input v-model="form.useraccount"></el-input>
      </el-form-item>
      <el-form-item label="大学" prop="class">
        <el-input v-model="form.userunit"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.userpassword"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="form.usergender">
          <el-radio label="男">男</el-radio>
          <el-radio label="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.userphone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.useremail"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">注册</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

  <script>
export default {
  data() {
    return {
      form: {
        username: "",
        useraccount: "",
        userunit: "",
        userpassword: "",
        usergender: "",
        userphone: "",
        useremail: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "姓名长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        useraccount: [
          { required: true, message: "请输入学号", trigger: "blur" },
          {
            pattern: /^[1-9]\d{11}$/,
            message: "学号格式不正确，请输入12位数字",
            trigger: "blur",
          },
        ],
        userunit: [
          { required: true, message: "请输入你的大学", trigger: "blur" },
        ],
        userpassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "密码长度在 6 到 16 个字符",
            trigger: "blur",
          },
        ],
        userphone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号格式不正确",
            trigger: "blur",
          },
        ],
        useremail: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            type: "email",
            message: "邮箱格式不正确",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  created() {
    //    this.form=={
    //         name: "",
    //         studentId: "",
    //         class: "",
    //         password: "",
    //       }
  },
  methods: {
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 提交表单数据
          console.log("表单数据：", this.form);
          this.$axios
            .post("/user/register", {
              username: this.form.username,
              useraccount: JSON.parse(this.form.useraccount) ,
              userunit: this.form.userunit,
              userpassword: this.form.userpassword,
              usergender: this.form.usergender,
              userphone: JSON.parse(this.form.userphone),
              useremail: this.form.useremail,
            })
            .then(({ data }) => {
              if (data.code === 200) {
                alert("注册成功");
                this.$router.push("/login");
              }
              if(data.code===500){
                alert("注册失败");
              }
            })
            .catch((resp) => {
              //除了请求失败的情况
              console.log("请求失败：" + resp.status + "," + resp.statusText);
            });
        } else {
          console.log("表单验证失败");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
  },
};
</script>
  <style scoped>
.student-register {
  max-width: 500px;
  margin: 0 auto;
  padding: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  background-color: #fff;
}

h2 {
  margin-top: 0;
  text-align: center;
}

.el-form-item__label {
  font-weight: bold;
}

.el-form-item__content {
  margin-bottom: 20px;
}

.el-input {
  width: 100%;
}

.el-button {
  width: 100%;
}
</style>