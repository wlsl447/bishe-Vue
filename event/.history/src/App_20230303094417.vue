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
  data: {
    datalist: ["111", "222", "333"],
    current: 0,
  },
  methods: {
    handleChange(index) {
      this.current = index;
    },
  },
});
</script>

<style>
</style>
