<!--  -->
<template>
  <div>
    <el-container style="height: 500px; border: 1px solid #eee" router>
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '3']">
          <el-menu-item index="/userCT/mycompetition">
            <template >我的比赛</template>
          </el-menu-item>
          <el-menu-item index="2">
            <template >我的申请</template>
          </el-menu-item>
          <el-menu-item index="3">
            <template >我加入的队伍</template>
          </el-menu-item>
          <el-menu-item index="7">
            <template >我创建的队伍</template>
          </el-menu-item>
          <el-menu-item index="4">
            <template >加入我的申请</template>
          </el-menu-item>
          <el-menu-item index="5">
            <template >我的处理记录</template>
          </el-menu-item>
          <el-menu-item index="6">
            <template >我申请的历史</template>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-container>
        <el-main>
          <el-table :data="tableData">
            <el-table-column prop="date" label="日期" width="140">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄",
    };
    return {
      tableData: Array(20).fill(item),
    };
  },
};
</script>
<style scoped>
.el-aside {
  color: #333;
}
</style>