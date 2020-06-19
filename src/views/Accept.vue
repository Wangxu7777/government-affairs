<!--  -->
<template>
  <div>
    <van-nav-bar id="reset" title="小型工程受理" />
    <van-notice-bar color="#EC6A42" background="#F0F0F0" left-icon="info-o">
      小型工程发现上报
    </van-notice-bar>
    <van-cell-group>
      <van-field label="工程发现单位" value="输入框只读" readonly />
      <van-field label="工程类型" value="输入框只读" readonly />
      <van-field label="地址信息" value="输入框只读" readonly />
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
      <van-button
        round
        block
        type="info"
        native-type="submit"
        size="large"
        @click="no_shouli"
      >
        不受理
      </van-button>
    </div>
    <div style="margin: 16px;">
      <van-button round block type="warning" native-type="submit" size="large">
        确认受理
      </van-button>
    </div>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit" size="large">
        一般工程
      </van-button>
    </div>
    <van-overlay :show="show" @click="show = false">
      <div class="icn">
        <icon-svg class="touxiang" icon-class="jujue1" />
      </div>
      <h1 class="text">已拒绝受理</h1>
    </van-overlay>
  </div>
</template>

<script>
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      show: false
    };
  },
  //方法集合
  methods: {
    no_shouli() {
      this.show = true;
    }
  },
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
.icn {
  height: 40vh;
  position: relative;
  .touxiang {
    width: 150px;
    height: 180px;
    position: absolute;
    left: 50%;
    top: 80%;
    transform: translate(-50%, -50%);
  }
}
.text {
  font-size: 40px;
  color: #fff;
  text-align: center;
  font-weight: 400;
}
</style>
