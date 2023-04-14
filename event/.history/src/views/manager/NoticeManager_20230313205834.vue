<template>
  <el-container>
    <el-aside width="200px">
      <h3>系统公告：</h3>
      <div
        v-for="(item, index) in mydata"
        :key="item.noticeId"
        class="notice-title"
      >
        <span
          @click.stop="chooseCard(index)"
          :class="carouseId === index ? 'isActive1' : ''"
          >{{ item.title }}</span
        >
        <i class="el-icon-delete" @click="handleDelete(item.noticeId)"></i>
      </div>
    </el-aside>
    <el-main class="main">
      <el-button type="primary" style="float: right" @click="addNotice()"
        >添加公告</el-button
      >
      <el-dialog
        title="添加公告"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <el-form ref="tableDatafrom" :model="noticeFrom" label-width="120px">
          <el-form-item label="公告标题">
            <el-input v-model="noticeFrom.title"> </el-input>
          </el-form-item>
          <el-form-item label="公告内容">
            <el-input v-model="noticeFrom.content"> </el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveNotice(noticeFrom)"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <div>
        <!-- v-for="item in mydata" :key="item.noticeId" -->
        <el-carousel
          :interval="4000"
          indicator-position="outside"
          ref="carousel"
          @change="changeIndex"
          height="500px"
          class="carousel"
        >
          <el-carousel-item v-for="item in mydata" :key="item.noticeId">
            <el-descriptions class="margin-top" :column="1">
              <template slot="title"
                ><span style="font-size: 30px">{{ item.title }}</span></template
              >
              <el-descriptions-item label="发布时间"
                ><span>{{
                  item.time | formatTimer
                }}</span></el-descriptions-item
              >
              <el-descriptions-item>
                <template slot="label">
                  <span style="font-size: large">内容</span>
                </template>
                <span class="notice-content">{{
                  item.content
                }}</span></el-descriptions-item
              >
            </el-descriptions>
          </el-carousel-item>
        </el-carousel>
        <!-- <h1>{{ item.title }}</h1>
          <h2>{{ item.time }}</h2>
          <h1>{{ item.content }}</h1> -->
      </div>
    </el-main>
  </el-container>
</template>
     
    <script>
import moment from "moment";
export default {
  data() {
    return {
      dialogVisible: false,
      mydata: [
        {
          noticeId: "",
          title: "",
          time: "",
          content: "",
          state: "",
        },
      ],
      carouseId: 0,
      tabPosition: "left",
      noticeFrom: {
        title: "",
        content: "",
      },
    };
  },
  methods: {
    handleDelete(id) {
      console.log(id);
      this.$confirm("此操作将删除公告, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //成功发送删除请求
          this.$axios
            .post("/deleteNotice", {
              params: {
                id: JSON.parse(id) ,
              },
            })
            .then(({ data }) => {
              if (data.code === 200) {
                this.getNotice();
                alert("删除成功");
              }
              if (data.code === 500) {
                alert("删除失败");
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    deleteNotice() {},
    addNotice() {
      this.dialogVisible = true;
    },
    //添加公告
    saveNotice(noticeFrom) {
      console.log(noticeFrom);
      this.$axios
        .post("/addNotice", {
          title: noticeFrom.title,
          content: noticeFrom.content,
        })
        .then(({ data }) => {
          if (data.code === 200) {
            this.dialogVisible = false;
            alert("添加成功");
            this.getNotice();
          }
          if (data.code === 500) {
            alert("添加失败");
          }
        });
    },
    changeIndex(index) {
      this.carouseId = index;
    },
    chooseCard: function (index) {
      this.$refs.carousel.setActiveItem(index);
    },
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
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
  created() {
    this.getNotice();
  },
  filters: {
    formatTimer: function (value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " " + h + ":" + m;
    },
  },
};
</script>
     
    <style lang="less" scoped>
.el-header,
.el-aside {
  background-color: rgb(255, 255, 255);
  // color: #333;
  text-align: center;
  line-height: 20px;
  height: 640px;

  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.main {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  // color: #333;
  //   text-align: center;
  background-color: rgb(250, 250, 250);
  line-height: 50px;
}
.carousel {
  background-color: rgb(250, 250, 250);
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
.isActive1 {
  color: #409eff;
}
.isActive2 {
  background: #0d27b8;
}
.title {
  text-align: center;
  font-size: 20px;
}
.content {
  width: 100%;
}
.notice-title {
  cursor: pointer;
  // margin: 100px 0 20px 0;
  margin-top: 20px;
  // padding: 10px;
}
.notice-content {
  font-size: large;
}
</style>
  