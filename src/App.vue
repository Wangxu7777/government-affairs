<template>
  <div id="app">
    <div id="nav"></div>
    <loading v-show="LOADING"></loading>
    <!-- <router-view /> -->
    <!-- 可以被缓存的视图组件 -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <!-- 不可以被缓存的视图组件 -->
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Loading from "./views/loading.vue";
export default {
  name: "App",
  computed: {
    ...mapState(["LOADING"])
  },
  components: {
    Loading
  },

  beforeDestroy() {
    // 关闭浏览器窗口的时候清空浏览器缓存在localStorage的数据
    window.onbeforeunload = function() {
      var storage = window.localStorage;
      storage.clear();
    };
  }
};
</script>
<style lang="less"></style>
