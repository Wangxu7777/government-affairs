<!--  -->
<template>
  <div>
    <van-nav-bar
      id="reset"
      title="街办移交建管委"
      left-arrow
      @click-left="onClickLeft"
    />
    <p>非小型建设工程移送单</p>
    <div class="biaoti">
      <icon-svg class="icn_box" icon-class="wenjianyisong" />
      <span>正在移送</span>
    </div>
    <van-cell-group>
      <van-field label="工程名称" :value="shigongData.prj_name" readonly />
      <van-field label="工程地址" :value="shigongData.prj_addr" readonly />
      <van-field label="建设单位" :value="shigongData.demand_com" readonly />
      <van-field
        label="施工单位"
        :value="shigongData.construction_com"
        readonly
      />
      <van-field
        label="监理单位"
        :value="shigongData.supervison_com"
        readonly
      />
      <van-field label="设计单位" :value="shigongData.design_rom" readonly />
      <van-field label="联系人姓名" :value="shigongData.fbi_name" readonly />
      <van-field label="联系人电话" :value="shigongData.fbi_phone" readonly />
      <van-field label="工程面积" :value="shigongData.prj_area" readonly />
      <van-field
        label="合同造价"
        :value="shigongData.contract_price"
        readonly
      />
      <van-field
        label="基本违法,违规情况"
        :value="shigongData.prj_check"
        readonly
      />
      <van-field
        label="街道办意见"
        :value="shigongData.prj_state == '3' ? '同意移送' : '不同意移送'"
        readonly
      />
    </van-cell-group>

    <div style="margin: 16px;">
      <van-button
        @click="butongyi"
        class="btn1"
        round
        block
        type="info"
        native-type="submit"
      >
        不同意接收
      </van-button>
    </div>
    <div style="margin: 16px;">
      <van-button
        @click="tongyi"
        class="btn2"
        round
        block
        type="info"
        native-type="submit"
      >
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
    return {
      shigongData: {
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
        prj_state: ""
      },
      contentData: {
        prj_name: ""
      },
      shigongData1: {},
      fasongData: {
        touser: "13201691542",
        toparty: "6899",
        msgtype: "news",
        agentid: "1000101",
        // image: { medis_id: "http://47.104.29.235:8080/flower.jpeg" }
        news: {
          articles: [
            {
              title: "政务微信流程测试",
              description: "政务微信流程",
              url: "",
              picurl: "http://47.104.29.235:8080/flower.jpeg"
            }
          ]
        }
      }
    };
  },
  //方法集合
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    async tongyi() {
      this.shigongData1.prj_state = "5";
      var { data: dt } = await this.$http.post(
        "wx/saveGongdi_info",
        this.shigongData1
      );
      if (dt != 0) {
        return this.$toast.fail({
          message: "提交失败"
        });
      }
      // this.fasongData.news.articles[0].url = `http://103.135.160.14:8925/dist/index.html#/receive?prj_name=${this.gongchengData.prj_name}`;
      // // this.fasongData.new.articles[0].url =
      // //   "http://47.104.29.235:8080/flower.jpeg";
      // var { data: dt1 } = await this.$http.post("sendMsg", this.fasongData);

      // if (dt1.data.errcode != 0) {
      //   return this.$toast.fail({
      //     message: "提交失败"
      //   });
      // }
      localStorage.setItem("shigongData", JSON.stringify(this.shigongData));
      this.$router.push({ name: "success4" });
    },
    async butongyi() {
      this.shigongData1.prj_state = "4";
      var { data: dt } = await this.$http.post(
        "wx/saveGongdi_info",
        this.shigongData1
      );
      if (dt != 0) {
        return this.$toast.fail({
          message: "提交失败"
        });
      }
      this.fasongData.news.articles[0].title = `小型工程接收失败`;
      this.fasongData.news.articles[0].description = `小型工程接收失败`;
      var qingqiuUrl = `http://hpweb.soyumall.cn/gongdi/%23/viewTransferOrder?prj_name=${this.shigongData.prj_name}`;
      this.fasongData.news.articles[0].url = `http://hptest.soyumall.cn/oauth/wx_login?callback=${qingqiuUrl}`;
      // this.fasongData.news.articles[0].url = `http://103.135.160.14:8925/dist/index.html#/viewTransferOrder?prj_name=${this.shigongData.prj_name}`;
      // this.fasongData.new.articles[0].url =
      //   "http://47.104.29.235:8080/flower.jpeg";
      var { data: dt1 } = await this.$http.post("sendMsg", this.fasongData);

      if (dt1.data.errcode != 0) {
        return this.$toast.fail({
          message: "提交失败"
        });
      }
      localStorage.setItem("shigongData", JSON.stringify(this.shigongData));
      this.$router.push({ name: "success4" });
    },
    async content() {
      this.contentData.prj_name = this.$route.query.prj_name;

      // console.log(this.contentData);
      var { data: dt } = await this.$http.get("wx/getGongdi_info", {
        params: this.contentData
      });
      this.shigongData1 = dt;
      delete this.shigongData1.updateTime;
      delete this.shigongData1.__v;
      delete this.shigongData1._id;
      this.shigongData.prj_state = dt.prj_state;
      this.shigongData.prj_name = dt.prj_name;
      this.shigongData.prj_addr = dt.prj_addr;
      this.shigongData.prj_area = dt.prj_area;
      this.shigongData.prj_price = dt.prj_price;
      this.shigongData.demand_com = dt.demand_com;
      this.shigongData.construction_com = dt.construction_com;
      this.shigongData.supervison_com = dt.supervison_com;
      this.shigongData.design_rom = dt.design_rom;
      this.shigongData.fbi_name = dt.fbi_name;
      this.shigongData.fbi_phone = dt.fbi_phone;
      this.shigongData.contract_price = dt.contract_price;
      this.shigongData.prj_check = dt.prj_check;
      const userid = sessionStorage.getItem("user_id");

      if (userid) {
        this.shigongData1.userid = JSON.parse(userid);
      } else {
        this.shigongData1.userid = this.$route.query.userid;

        sessionStorage.setItem(
          "user_id",
          JSON.stringify(this.$route.query.userid)
        );
      }
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
