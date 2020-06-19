<!--  -->
<template>
  <div>
    <van-nav-bar id="reset" title="添加协同人员" left-arrow />
    <p>小型工地施工信息单位</p>
    <van-radio-group v-model="radio">
      <van-cell-group>
        <van-cell title="社区平安办" clickable @click="radio = '1'">
          <template #right-icon>
            <van-radio name="1" />
          </template>
        </van-cell>
        <van-cell title="城管中队" clickable @click="radio = '2'">
          <template #right-icon>
            <van-radio name="2" />
          </template>
        </van-cell>
        <van-cell title="街道社区管理办" clickable @click="radio = '3'">
          <template #right-icon>
            <van-radio name="3" />
          </template>
        </van-cell>
        <van-cell title="灯光景观所" clickable @click="radio = '4'">
          <template #right-icon>
            <van-radio name="4" />
          </template>
        </van-cell>
        <van-cell title="第三方机构" clickable @click="radio = '5'">
          <template #right-icon>
            <van-radio name="5" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit">
        提交
      </van-button>
    </div>
  </div>
</template>

<script>
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      radio: "1"
    };
  },
  //方法集合
  methods: {},
  created() {}
};
</script>
<style lang="less" scoped>
.van-nav-bar {
  //   height: 60px;
  background: linear-gradient(
    -30deg,
    rgba(0, 210, 255, 1),
    rgba(55, 164, 255, 1)
  );
}
#reset /deep/ .van-ellipsis {
  //   font-size: 24px !important;
  color: #fff !important;
}
#reset /deep/ .van-icon {
  color: #fff !important;
}
#reset /deep/ .van-nav-bar__text {
  color: #fff !important;
}
p {
  color: #343434ff;
  font-size: 24px;
  padding: 30px;
  background-color: #f0f0f0ff;
}
</style>
