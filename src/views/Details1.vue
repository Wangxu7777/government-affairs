<!--  -->
<template>
  <div>
    <van-nav-bar id="reset" title="完整工程施工信息单" left-arrow />
    <p>小型工程施工信息表</p>
    <div class="biaoti">
      <icon-svg class="icn_box" icon-class="shenhe" />
      <span>已受理，待审核</span>
    </div>
    <van-cell-group>
      <van-field label="工程名称" value="输入框只读" readonly />
      <van-field label="工程地址" value="输入框只读" readonly />
      <van-field label="建设单位" value="输入框只读" readonly />
      <van-field label="施工单位" value="输入框只读" readonly />
      <van-field label="监理单位" value="输入框只读" readonly />
      <van-field label="设计单位" value="输入框只读" readonly />
      <van-field label="开工日期" value="输入框只读" readonly />
      <van-field label="竣工日期" value="输入框只读" readonly />
    </van-cell-group>
    <p>监督单位信息</p>
    <van-cell-group>
      <van-field label="单位名称" value="输入框只读" readonly />
      <van-field label="监督电话" value="输入框只读" readonly />
    </van-cell-group>
    <p>负责人信息</p>
    <van-cell-group>
      <van-field label="姓名" value="输入框只读" readonly />
      <van-field label="联系方式" value="输入框只读" readonly />
    </van-cell-group>

    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit">
        查看工程资质文件
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
.van-button {
  background: linear-gradient(
    -90deg,
    rgba(253, 204, 2, 1) 0%,
    rgba(255, 235, 0, 1) 100%
  );
  color: #343434ff;
  border: 0;
}
</style>
