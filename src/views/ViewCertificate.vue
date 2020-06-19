<!--  -->
<template>
  <div>
    <van-nav-bar id="reset" title="主任查看工程资质文件" left-arrow />
    <p>小型工地施工信息单位</p>
    <!-- <div>
      <van-row>
        <van-col span="6" class="col1">
          <span class="icn_box">
            <div class="icnyuan">
              <van-icon name="orders-o" />
            </div>
          </span>
        </van-col>
        <van-col span="18">产权证</van-col>
      </van-row>
    </div> -->
    <van-cell-group>
      <van-cell title="产权证" icon="orders-o" />
      <van-cell title="租赁合同" icon="orders-o" />
      <van-cell title="施工单位营业执照" icon="orders-o" />
      <van-cell title="施工单位资质证书" icon="orders-o" />
      <van-cell title="项目经理证书" icon="orders-o" />
      <van-cell title="安全员证书" icon="orders-o" />
      <van-cell title="项目经理任命文件" icon="orders-o" />
      <van-cell title="安全员任命书" icon="orders-o" />
      <van-cell title="设计单位资质文件" icon="orders-o" />
    </van-cell-group>
    <div style="margin: 16px;margin-bottom: 0;">
      <van-button class="btn1" round block type="info" native-type="submit">
        受理审核未通过
      </van-button>
    </div>
    <div style="margin: 10px;">
      <van-button class="btn2" round block type="info" native-type="submit">
        受理审核通过
      </van-button>
    </div>
    <div style="margin: 10px;">
      <van-button class="btn3" round block type="info" native-type="submit">
        非小型工程
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
      show: false,
      index: 0,
      images: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg"
      ]
    };
  },
  //方法集合
  methods: {
    onChange(index) {
      this.index = index;
    }
  },
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
.icn_box {
  display: inline-block;
  width: 80px;
  height: 60px;
  background: rgba(249, 249, 249, 1);
  box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.09);
  border-radius: 10px;
  line-height: 60px;
}
.van-row {
  //   height: 90px;
  border-bottom: 1px solid #343434ff;
}
.col1 {
  text-align: center;
}
.icnyuan {
  display: inline-block;
  width: 40px;
  height: 40px;
  background: rgba(0, 129, 255, 1);
  opacity: 0.5;
  border-radius: 50%;
  line-height: 40px;
  text-align: center;
  .van-icon {
    color: #fff;
    font-size: 14px;
    line-height: 20px;
  }
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
.btn3 {
  background: linear-gradient(
    -90deg,
    rgba(253, 204, 2, 1),
    rgba(255, 235, 0, 1)
  );
  color: #000000ff;
  border: 0;
}
</style>
