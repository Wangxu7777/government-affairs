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
      <van-field
        label="联系人姓名"
        :value="shigongData.prj_person_name"
        readonly
      />
      <van-field
        label="联系人电话"
        :value="shigongData.prj_person_phone"
        readonly
      />
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
        不同意移送
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
        同意移送
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
        userid: "",
        prj_name: "",
        prj_addr: "",
        prj_area: "",
        prj_price: "",
        demand_com: "",
        construction_com: "",
        supervison_com: "",
        design_rom: "",
        prj_person_name: "",
        prj_person_phone: "",
        prj_check: "",
        contract_price: "",
        prj_state: ""
      },

      gongchengData: {
        prj_name: ""
      },
      shigongData1: {},
      fasongData: {
        touser: "",
        // toparty: "6899",
        msgtype: "news",
        agentid: "1000201",
        // image: { medis_id: "http://47.104.29.235:8080/flower.jpeg" }
        news: {
          articles: [
            {
              title: "政务微信流程测试",
              description: "政务微信流程",
              url: "",
              picurl: `${
                this.$store.state.xiaoxitu
              }${require("../assets/img/fasongxinxitu.png")}`
            }
          ]
        }
      },
      auth: {}
    };
  },
  //方法集合
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    //发送信息
    async fasong() {
      this.fasongData.touser = "13901776093";
      this.fasongData.news.articles[0].title = `小型工程移送`;

      this.fasongData.news.articles[0].url = `${this.$store.state.articlesUrl}${this.$store.state.qingqiuUrl}/receive?prj_name=${this.gongchengData.prj_name}&du_msg=1`;
      this.fasongData.news.articles[0].description = this.gongchengData.prj_name;
      var { data: dt } = await this.$http.post("sendMsg", this.fasongData);
      if (dt.retcode == "-1") {
        return this.$toast.fail({
          message: "发送信息失败"
        });
      }
      if (dt.data.errcode != 0) {
        return this.$toast.fail({
          message: "发送信息失败"
        });
      }

      localStorage.setItem("shigongData", JSON.stringify(this.shigongData));
      this.$router.push({ name: "success4" });
    },
    async tongyi() {
      this.shigongData.prj_state = "3";
      var { data: dt } = await this.$http.post(
        "wx/saveGongdi_info",
        this.shigongData
      );
      if (dt !== 0) {
        return this.$toast.fail({
          message: "提交失败"
        });
      }

      this.fasong();
    },
    //发送信息
    async fasong1() {
      this.fasongData.touser = "18017569958";
      this.fasongData.news.articles[0].title = `小型工程移送失败`;

      this.fasongData.news.articles[0].url = `${this.$store.state.articlesUrl}${this.$store.state.qingqiuUrl}/viewTransferOrder?prj_name=${this.gongchengData.prj_name}&du_msg=1`;
      this.fasongData.news.articles[0].description = this.gongchengData.prj_name;
      var { data: dt } = await this.$http.post("sendMsg", this.fasongData);
      if (dt.retcode == "-1") {
        return this.$toast.fail({
          message: "发送信息失败"
        });
      }
      if (dt.data.errcode != 0) {
        return this.$toast.fail({
          message: "发送信息失败"
        });
      }

      localStorage.setItem("shigongData", JSON.stringify(this.shigongData));
      this.$router.push({ name: "success4" });
    },
    async butongyi() {
      this.shigongData.prj_state = "2";
      var { data: dt } = await this.$http.post(
        "wx/saveGongdi_info",
        this.shigongData
      );
      if (dt !== 0) {
        return this.$toast.fail({
          message: "提交失败"
        });
      }
      this.fasong1();
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
      // const gongchengData = localStorage.getItem("gongchengData");
      // this.shouliData = JSON.parse(gongchengData);
      // this.gongchengData.prj_name = this.shouliData.prj_name;
      const userid = sessionStorage.getItem("user_id");
      if (userid) {
        this.shigongData.userid = JSON.parse(userid);
      } else {
        this.shigongData.userid = this.$route.query.userid;

        sessionStorage.setItem("user_id", this.$route.query.userid);
      }
      this.gongchengData.prj_name = this.$route.query.prj_name;
      var { data: dt } = await this.$http.get("wx/getGongdi_info", {
        params: this.gongchengData
      });
      // this.shigongData1 = dt;
      // console.log(this.shigongData1);
      this.shigongData.prj_state = dt.prj_state;
      this.shigongData.prj_name = dt.prj_name;
      this.shigongData.prj_addr = dt.prj_addr;
      this.shigongData.prj_area = dt.prj_area;
      this.shigongData.prj_price = dt.prj_price;
      this.shigongData.demand_com = dt.demand_com;
      this.shigongData.construction_com = dt.construction_com;
      this.shigongData.supervison_com = dt.supervison_com;
      this.shigongData.design_rom = dt.design_rom;
      this.shigongData.prj_person_name = dt.prj_person_name;
      this.shigongData.prj_person_phone = dt.prj_person_phone;
      this.shigongData.contract_price = dt.contract_price;
      this.shigongData.prj_check = dt.prj_check;
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
