<!--  -->
<template>
  <div>
    <van-nav-bar id="reset" title="查看小型工程移送单" left-arrow />
    <p>非小型建设工程移送单</p>
    <div class="biaoti">
      <icon-svg class="icn_box" icon-class="wenjianyisong" />
      <span>正在移送</span>
    </div>
    <van-cell-group>
      <van-field label="工程名称" value="输入框只读" readonly />
      <van-field label="工程地址" value="输入框只读" readonly />
      <van-field label="建设单位" value="输入框只读" readonly />
      <van-field label="施工单位" value="输入框只读" readonly />
      <van-field label="监理单位" value="输入框只读" readonly />
      <van-field label="设计单位" value="输入框只读" readonly />
      <van-field label="联系人姓名" value="输入框只读" readonly />
      <van-field label="联系人电话" value="输入框只读" readonly />
      <van-field label="工程面积" value="输入框只读" readonly />
      <van-field label="合同造价" value="输入框只读" readonly />
      <van-field label="基本违法,违规情况" value="输入框只读" readonly />
    </van-cell-group>

    <div style="margin: 16px;">
      <van-button class="btn1" round block type="info" native-type="submit">
        不同意接收
      </van-button>
    </div>
    <div style="margin: 16px;">
      <van-button class="btn2" round block type="info" native-type="submit">
        同意接收
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
p {
  color: #343434ff;
  font-size: 24px;
  padding: 30px;
  background-color: #f0f0f0ff;
}
.icn_box {
  width: 45px;
  height: 42px;
  color: #00d2ffff;
}
.biaoti {
  padding: 30px;
  span {
    font-size: 36px;
    color: rgba(52, 52, 52, 1);
  }
}
.buju {
  padding: 30px;
}
.beijin {
  position: relative;
  height: 110px;
  background: rgba(249, 249, 249, 1);
  box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.09);
  border-radius: 10px;
}
.wenjian_box {
  width: 60px;
  height: 60px;
  background: rgba(0, 129, 255, 1);
  opacity: 0.5;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .icn_box1 {
    width: 23px;
    height: 30px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
.wenjianming {
  font-size: 18px;
  color: rgba(52, 52, 52, 1);
  padding: 10px;
  background-color: #fff;
  text-align: center;
}
.btn1 {
  background: linear-gradient(
    -90deg,
    rgba(245, 64, 52, 1),
    rgba(252, 87, 77, 1)
  );
  color: #000000ff;
  border: 0;
}
.btn2 {
  background: linear-gradient(
    -90deg,
    rgba(110, 223, 88, 1),
    rgba(128, 234, 98, 1)
  );
  color: #000000ff;
  border: 0;
}
</style>
