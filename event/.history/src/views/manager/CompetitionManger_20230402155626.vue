<!--  -->
<template>
  <div>
    <el-table :data="tableData" border>
      <!-- style="width: 100%" -->
      <!-- <el-table-column
        prop="id"
        label="赛事编号"
        width="80"
        v-show="isId"
      ></el-table-column> -->
      <el-table-column fixed label="序号" type="index" width="50"> </el-table-column>
      <el-table-column prop="cpname" label="赛事名字" width="100">
      </el-table-column>
      <el-table-column prop="typeName" label="类型" width="100">
      </el-table-column>

      <el-table-column prop="cpintro" label="介绍" width="200">
      </el-table-column>
      <el-table-column
        prop="cpstime"
        :formatter="dateFormat"
        label="开始时间"
        width="150"
      >
      </el-table-column>
      <el-table-column
        prop="cpetime"
        label="结束时间"
        width="150"
        :formatter="dateFormat"
      >
      </el-table-column>
      <el-table-column prop="plid" label="赛事场地" width="100">
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

      <el-table-column  width="200">
        <!-- <template slot="header">
            <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
          </template> -->
        <template slot="header">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
          <el-button type="success" @click="createCompetition()" size="small"
            >创建队伍</el-button
          >
        </template>
        <template slot-scope="scope">
          <el-button @click="selectCompetition(scope)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="mini" @click="handleUpdate(scope)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      ref="dialogCp"
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <div>
        
        <el-form ref="tableDatafrom" :model="tableDatafrom" label-width="120px">
          <el-form-item label="赛事名字">
            <el-input
              v-model="tableDatafrom.cpname"
              :disabled="isInput"
            ></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select
              v-model="tableDatafrom.typeid"
              placeholder="请选择"
              :disabled="isInput"
              allow-create
              filterable
            >
              <el-option
                v-for="item in cpTypeData"
                :key="item.id"
                :label="item.typeName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="介绍">
            <el-input
              v-model="tableDatafrom.cpintro"
              :disabled="isInput"
            ></el-input>
          </el-form-item>
          <el-form-item label="开始时间">
            <el-date-picker
              clearable
              style="width: 100%"
              v-model="tableDatafrom.cpstime"
              type="datetime"
              :formatter="dateFormat"
              placeholder="请选择时间"
              :disabled="isInput"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker
              style="width: 100%"
              v-model="tableDatafrom.cpetime"
              type="datetime"
              :disabled="isInput"
              :formatter="dateFormat"
              placeholder="请选择时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="赛事场地">
            <el-select
              v-model="tableDatafrom.plid"
              placeholder="请选择"
              :disabled="isInput"
              @change="handleRoom"
            >
              <el-option
                v-for="item in placeData"
                :key="item.id"
                :label="item.address"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="场地·具体位置">
            <el-select
              v-model="tableDatafrom.roomid"
              placeholder="请选择"
              :disabled="isInput"
            >
              <el-option
                v-for="item in roomData"
                :key="item.id"
                :label="item.room"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="个人赛·团体赛">
            <!-- <el-input
              v-model="tableDatafrom.teamType"
              :disabled="isInput"
            ></el-input > -->
            <template>
              <el-radio
                v-model="tableDatafrom.teamType"
                label="团队赛"
                :disabled="isInput"
                >团队赛</el-radio
              >
              <el-radio
                v-model="tableDatafrom.teamType"
                label="个人赛"
                :disabled="isInput"
                >个人赛</el-radio
              >
            </template>
          </el-form-item>
          <el-form-item label="级别">
            <el-input
              v-model="tableDatafrom.cplevel"
              :disabled="isInput"
            ></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <template>
              <el-radio
                v-model="tableDatafrom.cpstate"
                label="未开始"
                :disabled="isInput"
                >未开始</el-radio
              >
              <el-radio
                v-model="tableDatafrom.cpstate"
                label="进行中"
                :disabled="isInput"
                >进行中</el-radio
              >
              <el-radio
                v-model="tableDatafrom.cpstate"
                label="已结束"
                :disabled="isInput"
                >已结束</el-radio
              >
            </template>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogVisible = false"
          v-show="isConfirm"
          >确 定</el-button
        >
        <el-button
          type="primary"
          @click="competitionCreate(tableDatafrom)"
          v-show="isCreate"
          >确认创建</el-button
        >
        <el-button
          type="primary"
          @click="updateCompetition(tableDatafrom)"
          v-show="isUpdate"
          >确定修改</el-button
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
import { mapState } from "vuex";
export default {
  data() {
    return {
      isUpdate:false,
      isConfirm: true,
      isCreate: false,
      isInput: true,
      isId:false,
      dialogTitle: "",
      search: "",
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      dialogVisible: false,
      tableData: [
        {
          id: "",
          cpname: "",
          cpstime: "",
          cpetime: "",
          cpintro: "",
          plid: "",
          teamType: "",
          cplevel: "",
          cpstate: "",
          cptype: "",
          typeName: "",
          address: "",
          room: "",
        },
      ],
      tableDatafrom: {
        id: "",
        cpname: "",
        cpstime: "",
        cpetime: "",
        cpintro: "",
        plid: "",
        teamType: "",
        cplevel: "",
        cpstate: "",
        cptype: "",
        typeName: "",
        typeid:'',
        address: "",
        room: "",
        roomid: ""
      },
      cpTypeData: [
        {
          id: "",
          typeName: "",
        },
      ],
      placeData: [
        {
          id: "",
          address: "",
          room: "",
        },
      ],
      roomData: [
        {
          id: "",
          room: "",
        },
      ],
    };
  },
  //监听属性 类似于data概念
  computed: {
    ...mapState("userAbout", ["user"]),
  },
  methods: {

    //修改赛事
    updateCompetition(data) {
      console.log(data);
      if(data.cpstate==="未开始"){var state = 0}
      if(data.cpstate==="进行中"){var state = 1}
      if(data.cpstate==="已结束"){var state = 2}
      if(data.teamType==="团队赛"){var teamType = 0}
      if(data.teamType==="个人赛"){var teamType = 1}
      
      this.$axios
        .post("/updateCompetition", {
          id: data.id,
          cpname: data.cpname,
          cpstime: data.cpstime,
          cpetime: data.cpetime,
          cpintro: data.cpintro,
          teamType: teamType,
          cplevel: data.cplevel,
          cpstate: state,
          typeName: data.typeid,
          address: data.address,
          plid:data.plid,
          roomid:data.roomid,
        })
        .then(({ data }) => {
          console.log(data);
          
          if(data.code===200){
            alert("创建赛事成功")
            this.dialogVisible = false;
          }
          if(data.code===500){
            alert("失败")
            this.dialogVisible = false;
          }
          this.getCompetition();
        })
        .catch((resp) => {
          //除了请求失败的情况
          console.log("请求失败：" + resp.status + "," + resp.statusText);
        });
    },
    //创建赛事
    competitionCreate(data) {
      console.log(data);
      if(data.cpstate==="未开始"){var state = 0}
      if(data.cpstate==="进行中"){var state = 1}
      if(data.cpstate==="已结束"){var state = 2}
      if(data.teamType==="团队赛"){var teamType = 0}
      if(data.teamType==="个人赛"){var teamType = 1}
      this.$axios
        .post("/competitionCreate", {
          cpname: data.cpname,
          cpstime: data.cpstime,
          cpetime: data.cpetime,
          cpintro: data.cpintro,
          teamType: teamType,
          cplevel: data.cplevel,
          cpstate: state,
          typeName: data.typeName,
          address: data.address,
          plid:data.plid,
          roomid:data.roomid,
        })
        .then(({ data }) => {
          console.log(data);
          
          if(data.code===200){
            alert("创建赛事成功")
            this.dialogVisible = false;
          }
          if(data.code===500){
            alert("失败")
            this.dialogVisible = false;
          }
          this.getCompetition();
        })
        .catch((resp) => {
          //除了请求失败的情况
          console.log("请求失败：" + resp.status + "," + resp.statusText);
        });
    },
    //获取场地信息
    getPlace() {
      // console.log("场地");
      this.$axios
        .get("/getPlace")
        .then(({ data }) => {
          console.log(data);
          this.placeData = data.data;
        })
        .catch((resp) => {
          //除了请求失败的情况
          console.log("请求失败：" + resp.status + "," + resp.statusText);
        });
        
    },
    handleRoom(ids) {
      this.tableDatafrom.roomid = ''
      this.getPlace();
      // console.log(ids);
      delete this.$roomData
      this.getAddressRoom(ids);   
    },
    //获取具体位置
    getAddressRoom(ids) {
      // console.log(ids);
      this.$axios
        .get("/getAddressRoom", {
          params: {
            placeId: JSON.parse(ids),
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
    getRoom() {
      this.$axios
        .get("/getRoom")
        .then(({ data }) => {
          console.log(data);
          this.roomData = data.data;
        })
        .catch((resp) => {
          //除了请求失败的情况
          console.log("请求失败：" + resp.status + "," + resp.statusText);
        });
    },
    //获取赛事类型
    getCpType() {
      this.$axios
        .get("/getCpType")
        .then(({ data }) => {
          console.log(data);
          this.cpTypeData = data.data;
        })
        .catch((resp) => {
          //除了请求失败的情况
          console.log("请求失败：" + resp.status + "," + resp.statusText);
        });
    },
    createCompetition() {
      this.dialogVisible = true;
      this.isInput = false;
      this.isCreate = true;
      this.isConfirm = false;
      this.isUpdate=false,
      this.tableDatafrom = {};
      this.dialogTitle = "创建赛事";
      this.getPlace();
    },

    //更改赛事按钮
    handleUpdate(scope) {  
      this.tableDatafrom = JSON.parse(JSON.stringify(scope.row)); //赋值操作
      this.getPlace();
      console.log(scope.row.plid)
      this.isCreate = false;
      this.isConfirm = false;
      this.dialogVisible = true;
      this.isInput = false;
      this.isUpdate=true,
      this.dialogTitle = "更改赛事";
      this.getAddressRoom(scope.row.plid)  
      console.log(scope.row);
    },
    //查看赛事按钮
    selectCompetition(scope) {
      this.isCreate = false;
      this.isConfirm = true;
      this.dialogVisible = true;
      this.isInput = true;
      this.isUpdate=false,
      this.dialogTitle = "查看赛事";
      this.getPlace();
      this.tableDatafrom = JSON.parse(JSON.stringify(scope.row)); //赋值操作
      console.log(scope.row);
    },
    //格式化时间
    dateFormat: function (row, column) {
      // console.log(row, column)
      const date = row[column.property];
      if (date === undefined) {
        return "";
      }
      // 这里的格式根据需求修改
      return moment(date).format("YYYY-MM-DD HH:mm");
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
    //获取所有赛事
    getCompetition() {
      this.$axios
        .get("/getcp/page", {
          params: {
            currentPage: this.page.currentPage,
            pageSize: this.page.pageSize,
          },
        })
        .then(({ data }) => {
          if (data.code !== 200) return this.$message.error(data.msg);
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
    this.getRoom()
    
    this.getPlace();
    this.getCpType();
  },
};
</script>
  <style scoped>
</style>