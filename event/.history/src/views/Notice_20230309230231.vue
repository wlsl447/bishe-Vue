<template>
  <div class="home">
    <div class="content">
      <div class="lunbo w">
        <el-carousel>
          <el-carousel-item v-for="item in 4" :key="item">
            <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
        <div class="lis" @mouseleave="mouseLeave">
          <div class="leftmenus">
            <ul>
              <li
                :class="{ active: index == currentIndex }"
                v-for="(item, index) in newArrL"
                :key="index"
                @mouseover="mouseOver(index)"
                class="item"
              >
                <span>{{ item.title }}</span>
                <span></span>
              </li>
            </ul>
          </div>
          <div class="show-right" v-show="isShowRight">
            
          </div>
        </div>
      </div>
    </div>
  </div>
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
.w {
  width: 1200px;
  margin: 0 auto;
}
.content {
  background-color: #f4f4f4;
  height: 500px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
/deep/.el-carousel__container {
  height: 500px !important;
  //   z-index: -1;
}
.lunbo {
  height: 500px;
  position: relative;
}
.lis {
  height: 500px;
  //   background-color: rosybrown;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  z-index: 99;
}
.active {
  color: #fff;
  background-color: red;
  cursor: pointer;
}
.leftmenus {
  width: 200px;
  height: 500px;
  background-color: rgba(105, 101, 101, 0.6);
  opacity: 0.5;
  ul {
    .item {
      display: flex;
      justify-content: space-between;
      color: #fff;
      padding: 0 10px;
      line-height: 40px;
      //   background-color: salmon;
    }
  }
}
.show-right {
  width: 1000px;
  background-color: #fff;
  box-shadow: 1px 2px 3px 3px #ccc //四周阴影
;
}
</style>
