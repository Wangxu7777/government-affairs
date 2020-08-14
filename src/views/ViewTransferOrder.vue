<!--  -->
<template>
  <div>
    <van-nav-bar
      id="reset"
      title="查看小型工程移送单"
      left-arrow
      @click-left="onClickLeft"
    />
    <p>非小型建设工程移送单</p>
    <div class="biaoti">
      <icon-svg
        class="icn_box"
        icon-class="chuanshuliebiao"
        style="margin-right:10px"
      />
      <span v-if="this.prj_state == '-1' || this.prj_state == '1'"
        >正在移交</span
      >
      <span v-if="this.prj_state == '2'" style="margin-right:10px"
        >移交失败</span
      >
      <span v-if="this.prj_state == '5'" style="margin-right:10px"
        >已被成功接收</span
      >
      <span v-if="this.prj_state == '4'" style="margin-right:10px"
        >拒接接收</span
      >
      <span v-if="this.prj_state == '3'" style="margin-right:10px"
        >同意移交</span
      >

      <icon-svg
        v-if="this.prj_state == '3' || this.prj_state == '5'"
        class="icn_box"
        icon-class="querenduigougouhao"
      />
      <icon-svg
        v-if="this.prj_state == '4' || this.prj_state == '2'"
        class="icn_box"
        icon-class="cuohao"
      />
    </div>
    <van-cell-group>
      <van-field label="工程名称" :value="prj_name" readonly />
      <van-field label="工程地址" :value="prj_addr" readonly />
      <van-field label="建设单位" :value="demand_com" readonly />
      <van-field label="施工单位" :value="construction_com" readonly />
      <van-field label="监理单位" :value="supervison_com" readonly />
      <van-field label="设计单位" :value="design_rom" readonly />
      <van-field label="联系人姓名" :value="fbi_name" readonly />
      <van-field label="联系人电话" :value="fbi_phone" readonly />
      <van-field label="工程面积" :value="prj_area" readonly />
      <van-field label="合同造价" :value="contract_price" readonly />
      <van-field label="基本违法,违规情况" :value="prj_check" readonly />
    </van-cell-group>

    <div style="margin: 16px;">
      <van-button @click="shouye" round block type="info" native-type="submit">
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
    return {
      prj_name: "",
      prj_addr: "",
      prj_area: "",
      prj_price: "",
      demand_com: "",
      construction_com: "",
      supervison_com: "",
      design_rom: "",
      fbi_name: "",
      fbi_phone: "",
      prj_check: "",
      contract_price: "",
      prj_state: "",
      shigongData: {
        prj_name: ""
      },
      shigongData1: {},
      auth: {}
    };
  },
  //方法集合
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    shouye() {
      this.$router.push({ name: "Index" });
    },
    async content() {
      //获取用户权限状态
      const auth = sessionStorage.getItem("auth");

      if (auth) {
        this.auth = JSON.parse(auth);
      } else {
        if (this.$route.query.auth) {
          this.auth = JSON.parse(this.$route.query.auth);
          sessionStorage.setItem("auth", this.$route.query.auth);
        }
      }
      const shigongData = localStorage.getItem("shigongData");
      if (shigongData) {
        this.shigongData1 = JSON.parse(shigongData);
        this.shigongData.prj_name = this.shigongData1.prj_name;
      } else {
        this.shigongData.prj_name = this.$route.query.prj_name;
      }
      // console.log(this.shigongData);
      var { data: dt } = await this.$http.get("wx/getGongdi_info", {
        params: this.shigongData
      });

      this.prj_state = dt.prj_state;
      this.prj_name = dt.prj_name;
      this.prj_addr = dt.prj_addr;
      this.prj_area = dt.prj_area;
      this.prj_price = dt.prj_price;
      this.demand_com = dt.demand_com;
      this.construction_com = dt.construction_com;
      this.supervison_com = dt.supervison_com;
      this.design_rom = dt.design_rom;
      this.fbi_name = dt.fbi_name;
      this.fbi_phone = dt.fbi_phone;
      this.contract_price = dt.contract_price;
      this.prj_check = dt.prj_check;
    }
  },
  created() {
    this.content();
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
