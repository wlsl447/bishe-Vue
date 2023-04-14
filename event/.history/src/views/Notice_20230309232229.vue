<template>
  <el-container>
    <el-aside width="200px">
        <div  v-for="item in mydata" :key="item.noticeId">
            <h1>{{ item.title }}</h1>
        </div>
        
    </el-aside>
    <el-main>
        <div  v-for="item in mydata" :key="item.noticeId">
            <h1>{{ item.title }}</h1>
            <h2>{{ item.time }}</h2>
            <h1>{{ item.content }}</h1>
        </div> 
    </el-main>
  </el-container>
</template>
   
  <script>
  import moment from "moment";
export default {
  data() {
    return {
      mydata: [
        {
          noticeId: "",
          title: "",
          time: "",
          content: "",
          state: "",
        },
      ],
    };
  },
  methods: {
    getNotice() {
      this.$axios
        .get("/getnotice", {})
        .then(({ data }) => {
          console.log(data);
            if (data.code === 200) {
            
              this.mydata = data.data;

            }
        })
        .catch((resp) => {
          //除了请求失败的情况
          console.log("请求失败：" + resp.status + "," + resp.statusText);
        });
    },
    dateFormat: function (row, column) {
      // console.log(row, column)
      const date = row[column.property];
      if (date === undefined) {
        return "";
      }
      // 这里的格式根据需求修改
      return moment(date).format("YYYY-MM-DD HH:mm");
    },
  },
  created() {
    this.getNotice();
  },
};
</script>
   
  <style lang="less" scoped>
.el-header,

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 20px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
//   text-align: center;
  line-height: 20px;
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
