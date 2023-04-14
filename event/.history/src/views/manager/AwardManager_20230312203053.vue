<!--  -->
<template>
  <div>
    <el-table :data="tableData" border>
      <el-table-column label="序号" type="index" width="50"> </el-table-column>
      <!-- <el-table-column prop="id" label="id"> </el-table-column> -->
      <el-table-column prop="awardName" label="获奖名" width="100">
      </el-table-column>
      <el-table-column prop="cpname" label="获奖所属比赛"> </el-table-column>
      <el-table-column prop="awardLevel" label="获奖级别"> </el-table-column>
      <el-table-column prop="awardType" label="获奖类型"> </el-table-column>
      <!-- <el-table-column prop="userName" label="获奖者"> </el-table-column> -->
      <el-table-column
        prop="awardTime"
        :formatter="dateFormat"
        label="获奖时间"
      >
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleClick(scope.row)" size="small"
            >查看详细</el-button
          >
          <el-button type="danger" @click="handleClick(scope.row)" size="small"
            >删除</el-button
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
      title="获奖详情"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <div>
        <el-form ref="tableDatafrom" :model="dialogData" label-width="120px">
          <el-form-item label="获奖名">
            <el-input v-model="dialogData.awardName"></el-input>
          </el-form-item>
          <el-form-item label="赛事名字">
            <el-input v-model="dialogData.cpname"></el-input>
          </el-form-item>
          <el-form-item label="获奖级别">
              <el-input v-model="dialogData.awardLevel"></el-input>
            </el-form-item>
          <el-form-item label="类型"> 
            <el-input v-model="dialogData.awardType"></el-input>
          </el-form-item>
          <el-form-item label="获奖时间">
            <el-date-picker
              clearable
              style="width: 100%"
              v-model="dialogData.awardTime"
              type="datetime"
              :formatter="dateFormat"
              placeholder="请选择时间"
              
            >
            </el-date-picker>
          </el-form-item>
          <!-- <el-form-item label="获奖时间">
            <el-input v-model="dialogData.awardTime" :formatter="dateFormat"></el-input>
             </el-form-item> -->

        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="cancelApply(dialogData.id)"
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
          teamId: "",
          competitionId: "",
          cpname: "",
          cplevel: "",
          awardTime: "",
          awardName: "",
          awardLevel: "",
          userId: "",
          awardType: "",
          userName: "",
          teamName: "",
        },
      ],
      dialogData: {
        teamId: "",
        competitionId: "",
        cpname: "",
        cplevel: "",
        awardTime: "",
        awardName: "",
        awardLevel: "",
        userId: "",
        awardType: "",
        userName: "",
        teamName: "",
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
    cancelApply(id) {
      // dialogVisible = false
      console.log(id);
      this.$axios
        .post("/userteam/cancelapply", {
          id: id,
        })
        .then(({ data }) => {
          console.log(data);
          if (data.code === 200) {
            alert("取消申请成功");
            this.dialogVisible = false;
            this.getMyApply();
          } else if (data.code === 500) {
            this.dialogVisible = false;
            alert("取消申请失败");
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
      this.getMyAward();
    },
    //size改变时回调的函数，参数为当前的size
    sizeChange(val) {
      console.log("改变每页多少条，当前一页多少条数据", val);
      this.size = val;
      this.page = 1;
      this.getMyAward();
    },

    getMyAward() {
      // console.log(this.user)
      this.$axios
        .get("/listAward", {})
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
    this.getMyAward();
  },
  mounted() {},
};
</script>
        <style scoped>
</style>