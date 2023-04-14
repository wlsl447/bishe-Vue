<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// export default {
//   name: 'App'
// }
new Vue({
  el: "#app",
});
var obj = {
  data() {}
  methods: {}
}
Vue.createApp(obj).mount("#app")
</script>

<style>
</style>
