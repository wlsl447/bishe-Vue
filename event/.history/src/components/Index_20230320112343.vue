<!--  -->
<template>
  <div>
    
    <div id="building">
      <span id="title">欢迎使用校园赛事管理系统</span>
    </div>
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
      <el-table-column
        prop="cpetime"
        label="开始时间"
        :formatter="dateFormat"
        width="150"
      >
      </el-table-column>
      <el-table-column prop="teamType" label="个人赛·团体赛"> </el-table-column>
      <el-table-column prop="cpstate" label="状态"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>

      <!-- <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleClick(scope.row)" size="small"
            >查看</el-button
          >
        </template>
      </el-table-column> -->
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
    <!-- <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page="page"
      :page-size="size"
      :page-sizes="pageSizes"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination> -->
  </div>
  
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { mapState } from "vuex";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  //监听属性 类似于data概念
  computed: {
    ...mapState("userAbout", ["user"]),
  },
  data() {
    //这里存放数据
    return {
     
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
      ], //表格绑定的数据
    };
  },
  methods:{

  },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
    // console.log("create",this.user)
    // this.getMyCompetition();
  },
};
</script>
<style>


#building{
text-align: center;
font-size: 30px;
}
</style>