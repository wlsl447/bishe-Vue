<!--  -->
<template>
  <div>
    <el-container style="height: 625px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <!-- <router-link to="/userCT"></router-link> -->
        <el-menu
          :default-active="$route.path"
          class="el-menu-demo"
          router
          @select="handleSelect"
          background-color="#fff"
          text-color="#545c64"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="/mycompetition">
            <template>我的比赛</template>
          </el-menu-item>
          <el-menu-item index="/myapply">
            <template>我的申请</template>
          </el-menu-item>
          <el-menu-item index="/jointeam">
            <template>我加入的队伍</template>
          </el-menu-item>
          <el-menu-item index="/createteam">
            <template>我创建的队伍</template>
          </el-menu-item>
          <el-menu-item index="/addapply">
            <template>加入我的申请</template>
          </el-menu-item>
          <el-menu-item index="5">
            <template>我的处理记录</template>
          </el-menu-item>
          <el-menu-item index="6">
            <template>我申请的历史</template>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-main style="height: 625px">
        
        <router-view />
        <!-- <my-compotition></my-compotition> -->
      </el-main>
    </el-container>
  </div>
</template>

<script>
import MyCompotition from "../views/MyCompotition.vue";
export default {
  components: { MyCompotition },
  methods: {
    // handleSelect(key, keyPath) {
    //   console.log(key, keyPath);
    // },
    handleSelect(data) {
      // this.$router.push({ path: data });
      if (this.$route.path !== data) {
    this.$router.push({ path: data })
  }
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