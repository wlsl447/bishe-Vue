<!--  -->
<template>
  <div>
    <span>我的投诉和建议</span>
    <el-table :data="tableData" border>
      <el-table-column label="序号" type="index" width="50"> </el-table-column>
      <!-- <el-table-column prop="id" label="id"> </el-table-column> -->
      <el-table-column prop="type" label="队伍名" width="100">
      </el-table-column>
      <el-table-column prop="content" label="所属比赛"> </el-table-column>
      <el-table-column
        prop="time"
        :formatter="dateFormat"
        label="申请时间"
      >
      </el-table-column>

      <el-table-column label="操作" width="120">
        <template slot="header">
          <el-button type="success" @click="createTeamForm()" size="small"
            >创建队伍</el-button
          >
        </template>
        <template slot-scope="scope">
          <el-button type="primary" @click="handleClick(scope.row)" size="small"
            >通过申请</el-button
          >
          <!-- <el-button type="text" size="small" @click="test">编辑</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page="page"
      :page-size="size"
      :page-sizes="pageSizes"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <el-dialog
      title="申请加入队伍"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <span>是否通过该申请</span><br />

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="passApply(dialogData)"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
      
      <script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { mapState } from "vuex";
import moment from "moment";
export default {
  //import引入的组件需要注入到对象中才能使用

  components: {},
  data() {
    return {
      page: 1, //第几页
      size: 5, //一页多少条
      total: 0, //总条目数
      pageSizes: [5, 10, 20, 50, 100, 200, 300, 400, 500, 1000], //可选择的一页多少条
      dialogVisible: false,
      tableData: [
        {
          id: "",
          userId: "",
          content: "",
          type: "",
          time: "",
          start: "",
        },
      ],
      dialogData: {
        id: "",
        cpid: "",
        cpname: "",
        leaderName: "",
        name: "",
        state: "",
        teamId: "",
        teamIdentity: "",
        userId: "",
        number: "",
      },
      adviceFrom: {
        id: "",
        userId: "",
        content: "",
        type: "",
        time: "",
        start: "",
      },
    };
  },
  //监听属性 类似于data概念
  computed: {
    ...mapState("userAbout", ["user"]),
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //申请加入队伍
    passApply(res) {
      // dialogVisible = false
      console.log(res);
      this.$axios
        .post("/userteam/agreeapply", {
          userId: res.userId,
          teamId: res.teamId,
          applyId: res.applyId,
        })
        .then(({ data }) => {
          console.log(data);
          if (data.code === 200) {
            alert("通过申请成功");
            this.dialogVisible = false;
            this.getMyApply();
          } else if (data.code === 2000) {
            this.dialogVisible = false;
            alert("通过申请失败");
            // window.location.href = 'fail.html'
          }
        })
        .catch((resp) => {
          //除了请求失败的情况
          console.log("请求失败：" + resp.status + "," + resp.statusText);
        });
    },
    currentChange(val) {
      console.log("翻页，当前为第几页", val);
      this.page = val;
      this.getMyApply();
    },
    //size改变时回调的函数，参数为当前的size
    sizeChange(val) {
      console.log("改变每页多少条，当前一页多少条数据", val);
      this.size = val;
      this.page = 1;
      this.getMyApply();
    },

    getMyApply() {
      // console.log(this.user)
      this.$axios
        .get("/userteam/addapply", {})
        .then(({ data }) => {
          console.log(data);
          if (data.code === 200) {
            this.total = data.data.length;
            this.tableData = data.data;
            this.tableData = data.data.splice(
              (this.page - 1) * this.size,
              this.size
            );
          }
        })
        .catch((resp) => {
          //除了请求失败的情况
          console.log("请求失败：" + resp.status + "," + resp.statusText);
        });
    },
    handleClick(row) {
      this.dialogVisible = true;
      console.log(row);
      this.dialogData = row;
    },
    handleUpdate(res) {
      // this.dialogVisible = true;
      // this.tableData = res.row;
      console.log(res.row);
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
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // console.log("create",this.user)
    this.getMyApply();
  },
  mounted() {},
};
</script>
      <style scoped>
</style>