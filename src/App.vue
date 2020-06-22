<template>
  <div id="app">
    <div id="nav"></div>
    <router-view />
  </div>
</template>
<script>
export default {
  mounted() {
    // 关闭浏览器窗口的时候清空浏览器缓存在localStorage的数据
    window.onbeforeunload = function() {
      var storage = window.localStorage;
      storage.clear();
    };
  }
};
</script>
<style lang="less"></style>
