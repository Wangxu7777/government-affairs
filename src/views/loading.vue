<template>
  <div class="loading">
    <van-loading color="#fff" class="loading_vant" vertical
      >加载中...</van-loading
    >
  </div>
</template>

<script>
export default {
  name: "LOADING",
  data() {
    return {};
  }
};
</script>
<style scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 121;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
.loading .loading_vant {
  /* width: 1rem;
  height: 1rem; */
  margin: 11rem auto;
  color: #fff;
}
</style>
