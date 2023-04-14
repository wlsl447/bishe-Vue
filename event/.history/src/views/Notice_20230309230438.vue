<template>
<el-container>
  <el-aside width="200px">Aside</el-aside>
  <el-main>Main</el-main>
</el-container>
</template>
   
  <script>
export default {
  name: "Home",
  data() {
    return {
      noticeId: "",
      title: "",
      time: "",
      content: "",
      state: "",
      newArrL: [
        { id: 1, title: "商品" },
        { id: 2, title: "手机" },
        { id: 3, title: "电脑" },
      ],
      currentIndex: null,
      isShowRight: false,
      site: [
        { ud: 1, con: "哈哈01" },
        { ud: 2, con: "哈哈02" },
        { ud: 3, con: "哈哈03" },
      ],
    };
  },
  methods: {
    mouseOver(index) {
      this.currentIndex = index;
      this.isShowRight = true;
    },
    mouseLeave() {
      this.currentIndex = null;
      this.isShowRight = false;
    },
  },
};
</script>
   
  <style lang="less" scoped> 
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
