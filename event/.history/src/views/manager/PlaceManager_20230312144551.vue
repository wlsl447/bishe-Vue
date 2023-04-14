<!--  -->
<template>
  <div>
    <el-table :data="placeData" border>
      <el-table-column label="序 号" type="index" width="120">
      </el-table-column>
      <!-- <el-table-column prop="id" label="id"> </el-table-column> -->
      <el-table-column prop="address" label="赛事场地"> </el-table-column>

      <el-table-column label="操作">
        <template slot="header">
          <!-- <el-input v-model="search" size="mini" placeholder="输入关键字搜索" /> -->
          <el-button type="success" @click="createPlace()" size="small"
            >创建场地</el-button
          >
        </template>
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="getAddressRoom(scope.row)"
            size="small"
            >查看具体位置详细</el-button
          >
          <el-button
            type="primary"
            @click="getAddressRoom(scope.row)"
            size="small"
            >修改场地</el-button
          >
          <el-button
            type="primary"
            @click="getAddressRoom(scope.row)"
            size="small"
            >删除</el-button
          >
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
      :title="palceTitile"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
    >
      <el-table :data="roomData" border>
        <el-table-column label="序号" type="index" width="120">
        </el-table-column>
        <!-- <el-table-column prop="id" label="id"> </el-table-column> -->
        <el-table-column prop="room" label="具体位置"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="getAddressRoom(scope.row)"
              size="small"
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
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="placeVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="placeVisible = false">取 消</el-button>
        <el-button type="primary" @click="placeVisible = false"
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
      palceTitile: "",
      placeVisible:false,
      placeData: [
        {
          id: "",
          address: "",
          room: "",
        },
      ],
      placeForm:[],
      roomData: [
        {
          id: "",
          room: "",
        },
      ],
      tableData: [
        {
          id: "",
          address: "",
          room: "",
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
    createPlace() {
      console.log("创建场地");
      this.placeVisible=true
    },
    currentChange(val) {
      console.log("翻页，当前为第几页", val);
      this.page = val;
      this.getPlace();
    },
    //size改变时回调的函数，参数为当前的size
    sizeChange(val) {
      console.log("改变每页多少条，当前一页多少条数据", val);
      this.size = val;
      this.page = 1;
      this.getPlace();
    },
    //获取场地信息
    getPlace() {
      // console.log("场地");
      this.$axios
        .get("/getPlace")
        .then(({ data }) => {
          console.log(data);
          if (data.code === 200) {
            this.total = data.data.length;
            this.placeData = data.data;
            this.placeData = data.data.splice(
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
    //获取具体位置
    getAddressRoom(ids) {
      this.dialogVisible = true;
      this.palceTitile = ids.address;
      console.log(ids.id);
      this.$axios
        .get("/getAddressRoom", {
          params: {
            placeId: JSON.parse(ids.id),
          },
        })
        .then(({ data }) => {
          console.log(data);
          this.roomData = data.data;
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
    this.getPlace();
  },
  mounted() {},
};
</script>
      <style scoped>
</style>