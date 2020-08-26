<!--  -->
<template>
  <div>
    <van-nav-bar id="reset" title="提交成功" />
    <div class="chenggong">
      <div class="icn">
        <icon-svg class="touxiang" icon-class="chenggong" />
      </div>
      <h1 class="text">提交成功</h1>
      <p class="text">等待后续审核</p>
      <p class="text1">您可以在我的中查询工程单详情或查看处置进程</p>
      <div style="margin: 16px;margin-top: 130px">
        <van-button
          @click="xiangqin"
          class="btn1"
          round
          block
          type="info"
          native-type="submit"
          size="large"
        >
          查看施工信息单
        </van-button>
      </div>
      <div style="margin: 16px;">
        <van-button
          @click="shouye"
          class="btn2"
          round
          block
          type="warning"
          native-type="submit"
          size="large"
        >
          返回首页
        </van-button>
      </div>
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
      shigongData: { prj_name: "" }
    };
  },
  //方法集合
  methods: {
    xiangqin() {
      this.$router.push({
        name: "ProjectDetails",
        query: {
          prj_name: this.shigongData.prj_name
        }
      });
    },
    shouye() {
      this.$router.push({ name: "Index" });
    },
    RouterData() {
      this.shigongData.prj_name = this.$route.query.prj_name;
    }
  },
  created() {
    this.RouterData();
  }
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
.chenggong {
  padding: 30px;
  .icn {
    height: 30vh;
    position: relative;
    .touxiang {
      width: 140px;
      height: 140px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  h1 {
    font-size: 40px;
    color: #343434ff;
  }
  p {
    font-size: 30px;
    color: #8a8a8aff;
  }
  .text {
    text-align: center;
  }
  .text1 {
    text-align: center;
    font-size: 12px;
  }
  .btn1 {
    background: linear-gradient(
      -90deg,
      rgba(253, 204, 2, 1) 0%,
      rgba(255, 235, 0, 1) 100%
    );
    color: #343434ff;
    border: 0;
  }
  .btn2 {
    background: #fff;
    color: #5094eaff;
    border: 0;
  }
}
</style>
