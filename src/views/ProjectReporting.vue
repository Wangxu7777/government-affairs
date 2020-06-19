<!--  -->
<template>
  <div>
    <van-nav-bar
      id="reset"
      title="小型工程发现上报"
      left-text="返回"
      left-arrow
    />
    <van-notice-bar color="#EC6A42" background="#F0F0F0" left-icon="info-o">
      小型工程发现上报
    </van-notice-bar>
    <van-cell-group>
      <van-field label="工程发现单位" value="输入框只读" readonly />
      <van-field label="工程类型" value="输入框只读" readonly />
      <van-field label="地址信息" value="输入框只读" readonly />
      <van-field label="工程所属网络" value="输入框只读" readonly />
    </van-cell-group>
    <div class="tupian">
      <h5>工程照片</h5>
      <van-row gutter="20" class="zhaop">
        <van-col span="12">
          <van-image
            width="100%"
            height="100%"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
          <p>xx施工工程照片</p>
        </van-col>
        <van-col span="12">
          <van-image
            width="100%"
            height="100%"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
          <p>xx施工工程照片</p>
        </van-col>
      </van-row>
      <van-row gutter="20" class="zhaop">
        <van-col span="12">
          <van-image
            width="100%"
            height="100%"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
          <p>xx施工工程照片</p>
        </van-col>
        <van-col span="12">
          <van-image
            width="100%"
            height="100%"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
          <p>xx施工工程照片</p>
        </van-col>
      </van-row>
    </div>
    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit" size="large">
        信息修改
      </van-button>
    </div>
    <div style="margin: 16px;">
      <van-button round block type="warning" native-type="submit" size="large">
        返回首页
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
    return {};
  },
  //方法集合
  methods: {},
  created() {}
};
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
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
.tupian {
  padding: 30px;
  h5 {
    font-size: 30px;
    margin: 0;
  }
  p {
    font-size: 24px;
    text-align: center;
  }
  .zhaop {
    margin-top: 20px;
  }
}
</style>
