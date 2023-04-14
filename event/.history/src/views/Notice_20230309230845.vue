<template>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-main>Main</el-main>
  </el-container>
</template>
   
  <script>
export default {
  data() {
    return {
      noticeId: "",
      title: "",
      time: "",
      content: "",
      state: "",
    };
  },
  methods: {
    getNotice() {
      this.$axios
        .get("/getnotice", {})
        .then(({ data }) => {
          console.log(data);
        //   if (data.code === 200) {
        //     this.total = data.data.length;
        //     this.tableData = data.data;
        //     this.tableData = data.data.splice(
        //       (this.page - 1) * this.size,
        //       this.size
        //     );
        //   }
        })
        .catch((resp) => {
          //除了请求失败的情况
          console.log("请求失败：" + resp.status + "," + resp.statusText);
        });
    },
  },
  created() {},
};
</script>
   
  <style lang="less" scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
