<template>
  <div class="student-register">
    <h2>学生注册</h2>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="学号" prop="studentId">
        <el-input v-model="form.studentId"></el-input>
      </el-form-item>
      <el-form-item label="班级" prop="class">
        <el-input v-model="form.class"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

  <script>
export default {
  data() {
    return {
      form: {
        name: "",
        studentId: "",
        class: "",
        password: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "姓名长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        studentId: [
          { required: true, message: "请输入学号", trigger: "blur" },
          {
            pattern: /^[1-9]\d{7}$/,
            message: "学号格式不正确，请输入8位数字",
            trigger: "blur",
          },
        ],
        class: [{ required: true, message: "请输入班级", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "密码长度在 6 到 16 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 提交表单数据
          console.log("表单数据：", this.form);
        } else {
          console.log("表单验证失败");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.form.resetFields()
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