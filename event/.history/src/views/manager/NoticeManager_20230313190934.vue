<template>
  <el-container>
    <el-aside width="200px">
      <div v-for="(item, index) in mydata" :key="item.noticeId">
        <span
        class="notice-title"
          @click.stop="chooseCard(index)"
          :class="carouseId === index ? 'isActive1' : ''"
          >{{ item.title }}</span
        >
      </div>
    </el-aside>
    <el-main>
      <div>
        <!-- v-for="item in mydata" :key="item.noticeId" -->
        <el-carousel
          :interval="4000"
          indicator-position="outside"
          ref="carousel"
          @change="changeIndex"
        >
          <el-carousel-item v-for="item in mydata" :key="item.noticeId">
            <div class="title">
              <span>{{ item.title }}</span>
            </div>
            <div class="content">
              <el-descriptions :column="1">
                <el-descriptions-item label="标题" :formatter="dateFormat">{{
                  item.title
                }}</el-descriptions-item>
                <el-descriptions-item label="发布时间">{{
                  item.time | formatTimer
                }}</el-descriptions-item>
                <el-descriptions-item label="内容">{{
                  item.content
                }}</el-descriptions-item>
              </el-descriptions>
            </div>
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
      carouseData: [
        { url: "./img/1598410148507.png", title: "妇科咨询", id: 0 },
        { url: "./img/1598410249329.png", title: "儿童咨询", id: 1 },
        { url: "./img/1598410106204.png", title: "中医咨询", id: 2 },
      ],
      tabPosition: "left",
    };
  },
  methods: {
    changeIndex(index) {
      this.carouseId = index;
    },
    chooseCard: function (index) {
      this.carouseId = index;
      this.$refs.carousel.setActiveItem(index);
      console.log("carouseId" + carouseId);
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
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 20px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  //   text-align: center;
  line-height: 50px;
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
  background-color: orange;
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
.notice-title{
  cursor: pointer;
  margin: 100px 0 20px 0;
}
</style>
  