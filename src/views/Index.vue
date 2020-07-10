<template>
  <div>
    <div class="top_box">
      <p>老西门街道小型建设工程管理</p>

      <van-row class="heard" type="flex" align="center">
        <van-col>
          <icon-svg class="touxiang" icon-class="touxiang" />
        </van-col>
        <van-col @click="geren">
          <span>个人中心</span>
        </van-col>
      </van-row>
    </div>
    <div class="bottom_box">
      <span class="mingcheng">菜单</span>
      <div class="content">
        <van-row class="tubiaowie" type="flex" justify="space-around">
          <van-col class="tubiao" @click="faxianye">
            <div class="title1">
              <icon-svg class="icn_box" icon-class="faxian2" />
            </div>
            <div class="title_bom">
              <span>工程发现受理</span>
            </div>
          </van-col>
          <van-col class="tubiao" @click="ducha">
            <div class="title2">
              <icon-svg class="icn_box" icon-class="ducha" />
            </div>
            <div class="title_bom">
              <span>工程督查</span>
            </div>
          </van-col>
        </van-row>
        <van-row class="tubiaowie" type="flex" justify="space-around">
          <van-col class="tubiao" @click="jungong">
            <div class="title3">
              <icon-svg class="icn_box" icon-class="jungongyanshou" />
            </div>
            <div class="title_bom">
              <span>工程竣工</span>
            </div>
          </van-col>
          <van-col class="tubiao" @click="chaxun">
            <div class="title4">
              <icon-svg class="icn_box" icon-class="chaxun1" />
            </div>
            <div class="title_bom">
              <span>工程查询</span>
            </div>
          </van-col>
        </van-row>
      </div>
    </div>
    <p class="copyright">xxx部门总办 咨询电话：xxxxxxxx copyright©2020-2021</p>
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
  methods: {
    geren() {
      this.$router.push({ name: "User" });
    },
    jungong() {
      this.$router.push({ name: "CompletionList" });
    },
    chaxun() {
      this.$router.push({ name: "ProjectList" });
    },
    faxianye() {
      this.$router.push({ name: "EngineeringInformation" });
    },
    ducha() {
      this.$router.push({ name: "InspectorList" });
    }
  },
  created() {}
};
</script>
<style lang="less" scoped>
.top_box {
  height: 40vh;
  background: url("../assets/img/shouyetu.png") no-repeat top center;
  background-size: 100% 100%;
  padding: 20px;
  box-sizing: border-box;
  p {
    color: #fff;
    font-size: 24px;
    margin-bottom: 30px;
  }
  .touxiang {
    width: 60px;
    height: 60px;
    margin-right: 5px;
  }
  .heard span {
    color: #fff;
    font-size: 24px;
  }
}
.bottom_box {
  // height: 60vh;
  padding-top: 50px;
  padding-left: 99px;
  padding-right: 40px;
  // padding-bottom: 30px;
  box-sizing: border-box;
  position: relative;
  .content {
    width: 100%;
    height: 100%;
    padding-bottom: 90px;
    background: url("../assets/img/shouyetu2.png") no-repeat top center;
    background-size: 100% 100%;
  }
  .mingcheng {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 32px;
    color: #38a4ff;
    top: 0.9375rem;
    font-weight: 400;
  }
  .icn_box {
    width: 60px;
    height: 50px;
    color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .title1 {
    width: 138px;
    height: 138px;
    background: linear-gradient(
      -30deg,
      rgba(252, 92, 126, 1),
      rgba(253, 177, 156, 1)
    );
    border-radius: 50%;
    display: inline-block;
    position: relative;
  }
  .title2 {
    width: 138px;
    height: 138px;
    background: linear-gradient(
      -30deg,
      rgba(111, 209, 240, 1),
      rgba(67, 138, 234, 1)
    );
    border-radius: 50%;
    display: inline-block;
    position: relative;
  }
  .title3 {
    width: 138px;
    height: 138px;
    background: linear-gradient(
      -30deg,
      rgba(255, 78, 80, 1),
      rgba(249, 212, 36, 1)
    );
    border-radius: 50%;
    display: inline-block;
    position: relative;
  }
  .title4 {
    width: 138px;
    height: 138px;
    background: linear-gradient(
      -30deg,
      rgba(228, 233, 118, 1),
      rgba(90, 200, 81, 1)
    );
    border-radius: 50%;
    display: inline-block;
    position: relative;
  }
  .tubiaowie {
    padding-top: 60px;
  }
  .tubiao {
    text-align: center;
  }
  .title_bom {
    font-size: 24px;
    color: rgba(102, 102, 102, 1);
    font-weight: 400;
    margin-top: 20px;
  }
}
.copyright {
  font-size: 12px;
  color: rgba(154, 154, 154, 1);
  text-align: center;
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
