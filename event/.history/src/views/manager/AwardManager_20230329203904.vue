<!--  -->
<template>
  <div>
    <el-table :data="tableData" border>
      <el-table-column label="序号" type="index" width="50"> </el-table-column>
      <!-- <el-table-column prop="awardId" label="id"> </el-table-column> -->
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
        <template slot="header">
          <!-- <el-input v-model="search" size="mini" placeholder="输入关键字搜索" /> -->
          <el-button type="success" @click="handleAdd()" size="small"
            >颁奖</el-button
          >
        </template>
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
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <div>
        <el-form ref="tableDatafrom" :model="dialogData" label-width="120px">
          <el-form-item label="获奖名">
            <el-input
              v-model="dialogData.awardName"
              :disabled="isInput"
            ></el-input>
          </el-form-item>
          <el-form-item label="赛事名字">
            <el-button
              type="primary"
              @click="selectCompetition()"
              v-show="isButton"
              >选择比赛</el-button
            >
            <el-input v-model="dialogData.cpname" :disabled="isShow"></el-input>
            <!-- 内嵌dialog选择队伍对应的赛事 -->
            <el-dialog
              width="100%"
              title="内层 Dialog"
              :visible.sync="innerVisible"
              append-to-body
            >
              <el-table :data="innerData" border>
                <!-- style="width: 100%" -->
                <el-table-column fixed label="序号" type="index" width="50">
                </el-table-column>
                <el-table-column
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
                <el-table-column
                  prop="teamType"
                  label="个人赛·团体赛"
                  width="80"
                >
                </el-table-column>
                <el-table-column prop="cplevel" label="级别" width="80">
                </el-table-column>
                <el-table-column prop="cpstate" label="状态" width="80">
                </el-table-column>
                <el-table-column fixed="right" width="200">
                  <template slot-scope="scope">
                    <el-button
                      @click="handleSelect(scope.row)"
                      type="text"
                      size="small"
                      >选择该赛事</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="innerpage.currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="innerpage.size"
                layout="total,sizes, prev, pager, next"
                :total="innerpage.total"
              >
              </el-pagination>
            </el-dialog>
          </el-form-item>
          <el-form-item label="类型">
            <el-input
              v-model="dialogData.awardType"
              :disabled="isShow"
            ></el-input>
          </el-form-item>
          <el-form-item label="获奖人" v-show="isUserName">
            <el-button
              type="primary"
              @click="selectUserAward(dialogData.competitionId)"
              v-show="isButton"
              >选择获奖人</el-button
            >
            <!-- 内嵌dialog选择获奖人对应的赛事 -->
            <el-dialog
              width="100%"
              title="选择获奖人"
              :visible.sync="userVisible"
              append-to-body
            >
              <el-table :data="userDate" border>
                <!-- style="width: 100%" -->
                <el-table-column fixed label="序号" type="index" width="70">
                </el-table-column>
                <el-table-column prop="userunit" label="大学" width="100">
                </el-table-column>
                <el-table-column prop="username" label="名字" width="100">
                </el-table-column>
                <el-table-column prop="usergender" label="性别" width="80">
                </el-table-column>
                <el-table-column prop="userphone" label="电话" width="120">
                </el-table-column>
                <el-table-column prop="useremail" label="邮箱" width="170">
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      @click="selectUser(scope.row)"
                      type="text"
                      size="small"
                      >选择该学生</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </el-dialog>
            <el-input
              v-model="dialogData.userName"
              :disabled="isShow"
              v-show="isUserName"
            ></el-input
          ></el-form-item>
          <el-form-item label="获奖团队" v-show="isTeamName">
            <el-button
              type="primary"
              @click="selectTeamAward(dialogData.competitionId)"
              v-show="isButton"
              >选择获奖团队</el-button
            >
            <!-- 内嵌dialog选择获奖人对应的赛事 -->
            <el-dialog
              width="100%"
              title="选择获奖队伍"
              :visible.sync="teamVisible"
              append-to-body
            >
              <el-table :data="teamDate" border>
                <!-- style="width: 100%" -->
                <el-table-column fixed label="序号" type="index" width="70">
                </el-table-column>
                <el-table-column prop="name" label="队伍名" width="100">
                </el-table-column>
                <!-- <el-table-column prop="username" label="名字" width="100">
                </el-table-column>
                <el-table-column prop="usergender" label="性别" width="80">
                </el-table-column>
                <el-table-column prop="userphone" label="电话" width="120">
                </el-table-column>
                <el-table-column prop="useremail" label="邮箱" width="170">
                </el-table-column> -->
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      @click="selectTeam(scope.row)"
                      type="text"
                      size="small"
                      >选择该队伍</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </el-dialog>
            <el-input
              v-model="dialogData.teamName"
              :disabled="isShow"
              v-show="isTeamName"
            ></el-input>
          </el-form-item>
          <el-form-item label="获奖级别">
            <el-input
              v-model="dialogData.awardLevel"
              :disabled="isInput"
            ></el-input>
          </el-form-item>
          <el-form-item label="获奖时间">
            <el-date-picker
              clearable
              style="width: 100%"
              v-model="dialogData.awardTime"
              type="datetime"
              :formatter="dateFormat"
              placeholder="请选择时间"
              :disabled="isInput"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="上传文件">
            <!-- <el-upload
              class="upload-demo"
              action="/api/upload"
              :headers="{ Authorization: 'Bearer ' + token }"
              :on-success="handleUploadSuccess"
              :on-error="handleUploadError"
              :before-upload="beforeUpload"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload> -->
            <el-upload
              class="upload-demo"
              action="http://localhost:8082/uploadAward"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :on-success="handleSuccess"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList"
              :auto-upload="false"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAward(dialogData)" v-show="isAdd"
          >颁奖</el-button
        >
        <el-button type="primary" @click="selectSee(dialogData)" v-show="isSee"
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
      isInput: false,
      isUserName: false,
      dialogTitle: "",
      isSee: false,
      isAdd: false,
      isTeamName: false,
      awardVisible: false,
      innerVisible: false,
      userVisible: false,
      teamVisible: false,
      isShow: true,
      isButton: false,
      tableData: [
        {
          awardId: "",
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
          file: null,
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
      competitionData: {
        id: "",
        cpname: "",
      },
      teamDate: [
        {
          id: "",
          name: "",
        },
      ],
      userDate: [
        {
          id: "",
          username: "",
          useraccount: "",
          usergender: "",
          userunit: "",
          userphone: "",
          usertype: "",
          cpid: "",
          userpassword: "",
          useremail: "",
        },
      ],
      innerData: [
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
      innerpage: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      form: {
        fileName: "",
        fileUrl: "",
      },
      token: "",
      fileList: [
        {
          name: "food.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
        {
          name: "food2.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
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
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      // console.log(file);
      window.open(file.url)
    },
    handleSuccess(response, file, fileList){
      console.log(response)
      if()
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    //------------------------------------------------------------------
    beforeUpload(file) {
      // 在上传前执行的操作，如文件格式校验等
      return true; // 返回 true 表示可以上传，返回 false 表示禁止上传
    },
    handleUploadSuccess(response, file, fileList) {
      // 上传成功后执行的操作
      this.form.fileUrl = response.url;
    },
    handleUploadError(error, file, fileList) {
      // 上传失败后执行的操作
      console.log(error);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 将表单数据提交到后端
          this.$http.post("/api/submit", this.form);
        }
      });
    },
    selectSee(res) {
      console.log(res);
      this.$axios //用this.$axios就代表main.js中的Vue.prototype.$axios = axios的axios
        .post("/deleteAward", {
          //用post方法传 输入框输入的用户名和密码
          // JSON.stringify({
          awardId: res.awardId,
          // })
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.code === 200) {
            alert("删除成功");
            this.getMyAward();
            this.dialogVisible = false;
          } else if (res.data.code === 500) {
            alert("删除成功");
          }
        });
    },
    //获取获奖人
    selectUserAward(id) {
      console.log(id);
      this.userVisible = true;
      this.$axios
        .get("/uc/getcpuser", {
          params: {
            id: id,
          },
        })
        .then(({ data }) => {
          console.log(data);
          if (data.code === 200) {
            this.userDate = data.data;
          }
        })
        .catch((resp) => {
          //除了请求失败的情况
          console.log("请求失败：" + resp.status + "," + resp.statusText);
        });
    },
    //选择获奖人
    selectUser(row) {
      console.log(row);
      this.dialogData.userId = row.id;
      this.dialogData.userName = row.username;
      this.userVisible = false;
    },
    //选择队伍
    selectTeamAward(id) {
      console.log(id);
      this.teamVisible = true;
      this.$axios
        .get("/uc/getcpteam", {
          params: {
            id: id,
          },
        })
        .then(({ data }) => {
          console.log(data);
          if (data.code === 200) {
            this.teamDate = data.data;
          }
        })
        .catch((resp) => {
          //除了请求失败的情况
          console.log("请求失败：" + resp.status + "," + resp.statusText);
        });
    },
    //选择获奖队伍
    selectTeam(row) {
      console.log(row);
      this.dialogData.teamId = row.id;
      this.dialogData.teamName = row.name;
      this.teamVisible = false;
    },

    //申请加入队伍
    addAward(res) {
      // dialogVisible = false
      console.log(res);
      this.$axios
        .post("/addAward", {
          teamId: res.teamId,
          competitionId: res.competitionId,
          cpname: res.cpname,
          awardTime: res.awardTime,
          awardName: res.awardName,
          awardLevel: res.awardLevel,
          userId: res.userId,
          awardType: res.awardType,
          userName: res.userName,
          teamName: res.teamName,
        })
        .then(({ data }) => {
          console.log(data);
          if (data.code === 200) {
            alert("颁奖成功");
            this.dialogVisible = false;
            this.getMyAward();
          } else if (data.code === 500) {
            this.dialogVisible = false;
            alert("颁奖失败");
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
    //颁奖按钮事件
    handleAdd() {
      this.isAdd = true;
      this.isSee = false;
      this.dialogVisible = true;
      this.isInput = false;
      this.isButton = true;
      this.dialogData = {};
      this.dialogTitle = "颁奖";
    },
    //查看获奖按钮
    handleClick(row) {
      this.isAdd = false;
      this.isSee = true;
      this.isUserName = false;
      this.isTeamName = false;
      this.dialogVisible = true;
      this.isInput = true;
      this.isButton = false;
      this.dialogTitle = "获奖详细";
      console.log(row);
      if (row.userName != null) {
        this.isUserName = true;
      }
      if (row.teamName != null) {
        this.isTeamName = true;
      }
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
    handleSizeChange(pageSize) {
      this.innerpage.pageSize = pageSize;
      this.getCompetition();
    },
    handleCurrentChange(currentPage) {
      this.innerpage.currentPage = currentPage;
      this.getCompetition();
    },
    getCompetition() {
      this.$axios
        .get("/getcp/page", {
          params: {
            currentPage: this.innerpage.currentPage,
            pageSize: this.innerpage.pageSize,
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
          let innerpage = data.data;
          this.innerData = innerpage.records;
          this.innerpage.total = innerpage.total;
          this.innerpage.currentPage = innerpage.current;
          this.innerpage.pageSize = innerpage.size;
        })
        .catch((resp) => {
          //除了请求失败的情况
          console.log("请求失败：" + resp.status + "," + resp.statusText);
        });
    },
    //选择赛事按钮
    selectCompetition() {
      this.isInput = false;
      this.innerVisible = true;
      this.getCompetition();
    },
    //选择
    handleSelect(row) {
      console.log(row);
      this.dialogData.cpid = row.id;
      this.dialogData.cpname = row.cpname;
      this.dialogData.competitionId = row.id;
      if (row.teamType === "个人赛") {
        console.log(row.teamType);
        this.isUserName = true;
        this.isTeamName = false;
        this.dialogData.awardType = row.teamType;
      }
      if (row.teamType === "团队赛") {
        console.log(row.teamType);
        this.isUserName = false;
        this.isTeamName = true;
        this.dialogData.awardType = row.teamType;
      }
      this.innerVisible = false;
      console.log(this.dialogData);
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
.upload-demo {
  display: inline-block;
  margin-bottom: 20px;
}
</style>