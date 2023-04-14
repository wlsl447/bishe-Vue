<!--  -->
<template>
  <div>
    <el-table :data="tableData" border>
      <el-table-column label="序号" type="index" width="50"> </el-table-column>
      <el-table-column prop="id" label="编号" width="50"> </el-table-column>
      <el-table-column prop="cpname" label="赛事名字" width="100">
      </el-table-column>
      <el-table-column prop="typeName" label="类型"> </el-table-column>
      <el-table-column
        prop="cpstime"
        label="开始时间"
        :formatter="dateFormat"
        width="150"
      >
      </el-table-column>
      <el-table-column prop="teamType" label="个人赛·团体赛"> </el-table-column>
      <el-table-column prop="cpstate" label="状态"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>

      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleClick(scope.row)" size="small"
            >查看</el-button
          >
          <!-- <el-button type="text" size="small" @click="test">编辑</el-button> -->
        </template>
      </el-table-column>
      <!-- <el-table-column fixed="right" width="200">
        <template slot="header">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="mini" @click="handleUpdate(scope, res)"
            >编辑</el-button
          >
        </template>
      </el-table-column> -->
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
      size: 3, //一页多少条
      total: 0, //总条目数
      pageSizes: [3, 5, 10, 20, 50, 100, 200, 300, 400, 500, 1000], //可选择的一页多少条
      tableData: [], //表格绑定的数据
      allData: [
        {
          id: "",
          typeName: "",
          cpname: "",
          cpstime: "",
          teamType: "",
          cpstate: "",
        },
      ],
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
    getTabelData() {
      //allData为全部数据
      this.tableData = this.allData.slice(
        (this.page - 1) * this.size,
        this.page * this.size
      );
      this.total = this.allData.length;
    },
    //获取表格数据，自行分页（splice）
    getTabelData2() {
      let data = JSON.parse(JSON.stringify(this.allData));
      console.log(data);
      this.tableData = data.splice((this.page - 1) * this.size, this.size);
      this.total = this.allData.length;
    },
    //page改变时的回调函数，参数为当前页码
    currentChange(val) {
      console.log("翻页，当前为第几页", val);
      this.page = val;
      this.getMyCompetition();
    },
    //size改变时回调的函数，参数为当前的size
    sizeChange(val) {
      console.log("改变每页多少条，当前一页多少条数据", val);
      this.size = val;
      this.page = 1;
      this.getMyCompetition();
    },
    test() {
      console.log(this.user);
    },

    getMyCompetition() {
      // console.log(this.user)
      this.$axios
        .get("/getusercp", {
          params: {
            id: this.user.id,
            // currentPage: this.page.currentPage,
            // pageSize: this.page.pageSize,
          },
        })
        .then(({ data }) => {
          console.log(data);
          if (data.code === 200) {
            // this.allData = data.data;
          //   let data = JSON.parse(JSON.stringify(this.allData));
            // console.log(data);
            this.tableData = data.data.splice(
              (this.page - 1) * this.size,
              this.size
            );
            this.total = this.allData.length;            
          }
        })
        .catch((resp) => {
          //除了请求失败的情况
          console.log("请求失败：" + resp.status + "," + resp.statusText);
        });
    },
    handleClick(row) {
      console.log(row);
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
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // console.log("create",this.user)
    this.getMyCompetition();
  },
  mounted() {},
};
</script>
<style scoped>
</style>