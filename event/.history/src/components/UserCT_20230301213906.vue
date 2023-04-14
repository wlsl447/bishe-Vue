<!--  -->
<template>
  <div>
    <el-container style="height: 500px; border: 1px solid #eee" >
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      router
      @select="handleSelect"
      background-color="#fff"
      text-color="#545c64"
      active-text-color="#ffd04b"
    >
    <el-menu-item index="1">首页</el-menu-item>
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
          
          <!-- <router-view /> -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
    };
  },
};
</script>
<style scoped>
.el-aside {
  color: #333;
}
</style>