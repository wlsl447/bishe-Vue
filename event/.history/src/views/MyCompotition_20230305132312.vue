<!--  -->
<template>
  <div>
    <el-table :data="tableData" border>
      <el-table-column prop="id" label="编号" width="50"> </el-table-column>
      <el-table-column prop="cpname" label="赛事名字" width="100">
      </el-table-column>
      <el-table-column prop="typeName" label="类型"> </el-table-column>
      <el-table-column prop="cpstime" label="开始时间" :formatter="dateFormat" width="150"> </el-table-column>
      <el-table-column prop="teamType" label="个人赛·团体赛"> </el-table-column>
      <el-table-column prop="cpstate" label="状态"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>

      <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small" @click="test">编辑</el-button>
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
      
      tableData: [{
        id: "",
        typeName: "",
        cpname: "",
        cpstime: "",
        teamType: "",
        cpstate: "",
      }]
    };
  },
  //监听属性 类似于data概念
  computed: {
       ...mapState("userAbout", ["user"])
    ,
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    test(){
      console.log(this.user)
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
          if(data.code===200){
            this.tableData = data.data
          }

          // if (data.code !== 200) return this.$message.error(data.msg);
          // console.log(data.data.records);
          //遍历数组
          // if(data.code)
          // var arr = data;
          // console.log(arr)
          // Object.keys(arr).forEach((item) => {
          //   console.log(arr[item]);
          //   this.tableData.id=item.id
          // });
          // let page = data.data;
          // this.tableData = data;
          // this.page.total = page.total;
          // this.page.currentPage = page.current;
          // this.page.pageSize = page.size;
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
    dateFormat: function(row, column) {
      // console.log(row, column)
      const date = row[column.property]
      if (date === undefined) {
        return ''
      }
      // 这里的格式根据需求修改
      return moment(date).format("YYYY-MM-DD HH:mm")
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // console.log("create",this.user)
    this.getMyCompetition();
  },
  mounted(){
    
  }
};
</script>
<style scoped>
</style>