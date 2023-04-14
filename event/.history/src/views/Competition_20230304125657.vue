<!--  -->
<template>
  <div>
    <el-table :data="tableData" border>
      <!-- style="width: 100%" -->
      <el-table-column
        fixed
        prop="id"
        label="赛事编号"
        width="80"
      ></el-table-column>
      <el-table-column prop="cpname" label="赛事名字" width="100">
      </el-table-column>
      <el-table-column prop="typeName" label="类型" width="100">
      </el-table-column>

      <el-table-column prop="cpintro" label="介绍" width="200">
      </el-table-column>
      <el-table-column prop="cpstime" :formatter="dateFormat" label="开始时间" width="150">
        <!-- <template slot-scope="scope">
          {{ timeFormatter(scope.row.cpstime) }}
        </template> -->
      </el-table-column>
      <el-table-column prop="cpetime" label="结束时间" width="150">
        <template slot-scope="scope">
          {{ timeFormatter(scope.row.cpetime) }}
        </template>
      </el-table-column>
      <el-table-column prop="address" label="赛事场地" width="100">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>具体位置: {{ scope.row.room }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.address }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="teamType" label="个人赛·团体赛" width="80">
      </el-table-column>
      <el-table-column prop="cplevel" label="级别" width="80">
      </el-table-column>
      <el-table-column prop="cpstate" label="状态" width="80">
      </el-table-column>

      <el-table-column fixed="right" width="200">
        <template slot="header">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button @click="handleUpdate(scope)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="mini" @click="handleUpdate(scope)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="编辑赛事"
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose"
    >
      <div>
        <el-form ref="form" :model="tableData" label-width="120px">
          <el-form-item label="赛事名字">
            <el-input v-model="tableData.cpname" ></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-input v-model="tableData.typeName"></el-input>
          </el-form-item>
          <el-form-item label="介绍">
            <el-input v-model="tableData.cpintro"></el-input>
          </el-form-item>
          <el-form-item label="开始时间">
            <!-- <el-input v-model="tableData.cpstime" >
            </el-input> -->
            <el-date-picker
              clearable
              style="width: 100%"
              v-model="tableData.cpstime"
              type="datetime"
              :formatter="dateFormat"
              placeholder="请选择时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker
              style="width: 100%"
              v-model="tableData.cpetime"
              type="datetime"

              :formatter="dateFormat"
              placeholder="请选择时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="赛事场地">
            <el-input v-model="tableData.address"></el-input>
          </el-form-item>
          <el-form-item label="个人赛·团体赛">
            <el-input v-model="tableData.teamType"></el-input>
          </el-form-item>
          <el-form-item label="级别">
            <el-input v-model="tableData.cplevel"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-input v-model="tableData.cpstate"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="编辑赛事"
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose"
    >
      <div>
        <el-form ref="form" :model="tableData" label-width="120px">
          <el-form-item label="赛事名字">
            <el-input v-model="tableData.cpname" :disabled="isInput"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-input v-model="tableData.typeName" :disabled="isInput"></el-input>
          </el-form-item>
          <el-form-item label="介绍">
            <el-input v-model="tableData.cpintro" :disabled="isInput"></el-input>
          </el-form-item>
          <el-form-item label="开始时间">
            <!-- <el-input v-model="tableData.cpstime" >
            </el-input> -->
            <el-date-picker
              clearable
              style="width: 100%"
              v-model="tableData.cpstime"
              type="datetime"
              :formatter="dateFormat"
              placeholder="请选择时间"
              :disabled="isInput" >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker
              style="width: 100%"
              v-model="tableData.cpetime"
              type="datetime"
              :disabled="isInput"
              :formatter="dateFormat"
              placeholder="请选择时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="赛事场地">
            <el-input v-model="tableData.address" :disabled="isInput"></el-input>
          </el-form-item>
          <el-form-item label="个人赛·团体赛">
            <el-input v-model="tableData.teamType" :disabled="isInput"></el-input>
          </el-form-item>
          <el-form-item label="级别">
            <el-input v-model="tableData.cplevel" :disabled="isInput"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-input v-model="tableData.cpstate" :disabled="isInput"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addusercp(tableData)">报名</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="page.currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="page.size"
      layout="total,sizes, prev, pager, next"
      :total="page.total"
    >
    </el-pagination>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      isInput: true,
      search:'',
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      dialogVisible: false,
      tableData: [
        // {
        //   id: "",
        //   cpname: "",
        //   cptype: "",
        //   cpstime: "",
        //   cpstime: "",
        //   plid: "",
        //   team_type: "",
        //   cplevel: "",
        //   cpstate: "",
        // },
        {
          id: "",
          cpname: "",
          cpstime: "",
          cpetime: "",
          cpintro: "",
          plid: 1,
          teamType: 0,
          cplevel: "",
          cpstate: "",
          cptype: 1,
          typeName: "",
          address: "",
          room: "",
        },
      ],
      tableDatafrom:{
        id: "",
          cpname: "",
          cpstime: "",
          cpetime: "",
          cpintro: "",
          plid: 1,
          teamType: 0,
          cplevel: "",
          cpstate: "",
          cptype: 1,
          typeName: "",
          address: "",
          room: "",
      } 
    };
  },
  methods: {
    addusercp(res){
      console.log(res)
      this.$axios //用this.$axios就代表main.js中的Vue.prototype.$axios = axios的axios
          .post("/addusercp", {
            //用post方法传 输入框输入的用户名和密码
            account: this.loginForm.account,
            password: this.loginForm.password,
          })
          .then((res) => {
            console.log(res.data);
            // if (data.data.code === 200) {
            //   if (data.data.data.usertype === 0) {
            //     //路由的跳转－－正常跳转就行
            //   } else if (data.data.data.usertype === 3) {

            //   }
            // } else if (data.data.code === 500) {
            //   alert("用户名或者密码错误，请重新输入");
            //   // window.location.href = 'fail.html'
            // }
          });
    },

    handleUpdate(scope) {
      this.dialogVisible = true;
      this.tableData = scope.row;
      console.log(scope.row);
    },
    dateFormat: function(row, column) {
      // console.log(row, column)
      const date = row[column.property]
      if (date === undefined) {
        return ''
      }
      // 这里的格式根据需求修改
      return moment(date).format("YYYY-MM-DD")
    },
    timeFormatter(time) {
      return this.$dayjs(time).format("YYYY-MM-DD HH:mm");
    },
    handleSizeChange(pageSize) {
      this.page.pageSize = pageSize;
      this.getCompetition();
    },
    handleCurrentChange(currentPage) {
      this.page.currentPage = currentPage;
      this.getCompetition();
    },
    handleClick(row) {
      console.log(row);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    getCompetition() {
      this.$axios
        .get("/getcp/page", {
          params: {
            currentPage: this.page.currentPage,
            pageSize: this.page.pageSize,
          },
        })
        .then(({ data }) => {
          console.log(data);

          if (data.code !== 200) return this.$message.error(data.msg);
          console.log(data.data.records);
          //遍历数组
          var arr = data.data.records;
          // console.log(arr)
          Object.keys(arr).forEach((item) => {
            // console.log(arr[item]);
          });
          let page = data.data;
          this.tableData = page.records;
          this.page.total = page.total;
          this.page.currentPage = page.current;
          this.page.pageSize = page.size;
        })
        .catch((resp) => {
          //除了请求失败的情况
          console.log("请求失败：" + resp.status + "," + resp.statusText);
        });
    },
  },
  created() {
    this.getCompetition();
  },
};
</script>
<style scoped>
</style>