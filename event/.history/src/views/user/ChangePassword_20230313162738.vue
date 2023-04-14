<!--  -->
<template>
  <div class="change-pass">
    <a-form-model
      :layout="'horizontal'"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      :colon="false"
      :rules="rules"
      :model="ruleForm"
      ref="ruleForm"
    >
      <a-form-model-item hidden prop="id">
        <a-input v-model="ruleForm.id" />
      </a-form-model-item>
      <a-form-model-item
        label="新密码"
        prop="password"
        has-feedback
        style="margin-bottom: 20px"
      >
        <a-input
          v-model="ruleForm.password"
          placeholder="请输入新密码"
          :maxLength="32"
          autocomplete="off"
        />
      </a-form-model-item>
      <a-form-model-item
        label="确认密码"
        prop="confirm"
        has-feedback
        style="margin-bottom: 0px"
      >
        <a-input
          v-model="ruleForm.confirm"
          placeholder="请输入确认密码"
          :maxLength="32"
          autocomplete="off"
        />
      </a-form-model-item>
    </a-form-model>
    <el-button
      type="primary"
      size="medium"
      @click="handleSubmit"
      style="margin-left: 77px; margin-top: 20px"
      >保存</el-button
    >
  </div>
</template>


<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    //这里一般写函数的声明。页面创建完成时，除非此函数
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
</style>