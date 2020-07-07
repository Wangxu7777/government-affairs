<template>
  <div>
    <van-nav-bar id="reset" title="非小型建设工程移送单" />
    <p>工程信息</p>
    <van-form validate-first @submit="onSubmit">
      <van-field
        readonly
        v-model="shigongData.prj_name"
        name="工程名称"
        label="工程名称"
        placeholder="工程名称"
      />
      <van-field
        v-model="shigongData.prj_addr"
        name="工程地址"
        label="工程地址"
        placeholder="工程地址"
      />
      <van-field
        v-model="shigongData.demand_com"
        name="建设单位"
        label="建设单位"
        placeholder="建设单位"
      />

      <van-field
        v-model="shigongData.construction_com"
        name="施工单位"
        label="施工单位"
        placeholder="施工单位"
      />

      <van-field
        v-model="shigongData.supervison_com"
        name="监理单位"
        label="监理单位"
        placeholder="监理单位"
      />
      <van-field
        v-model="shigongData.design_rom"
        name="设计单位"
        label="设计单位"
        placeholder="设计单位"
      />

      <van-field
        v-model="shigongData.prj_person_name"
        name="联系人姓名"
        label="联系人姓名"
        placeholder="联系人姓名"
      />
      <van-field
        v-model="shigongData.prj_person_phone"
        name="联系人电话"
        label="联系人电话"
        placeholder="联系人电话"
      />

      <van-field
        v-model="shigongData.prj_area"
        name="工程面积"
        label="工程面积"
        placeholder="工程面积"
      />

      <van-field
        v-model="shigongData.contract_price"
        name="合同造价"
        label="合同造价"
        placeholder="合同造价"
      />
      <van-field
        v-model="shigongData.prj_check"
        name="基本违法、违规情况"
        label="基本违法、违规情况"
        placeholder="基本违法、违规情况"
      />
      <div style="margin: 16px;">
        <van-button
          @click="yijiao"
          round
          block
          type="info"
          native-type="submit"
        >
          确认移交
        </van-button>
      </div>
    </van-form>
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

      showCalendar: false,
      showCalendar1: false,
      gongchengData: {
        prj_name: ""
      },
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
    async content() {
      this.gongchengData.prj_name = this.$route.query.prj_name;
      var { data: dt } = await this.$http.get("wx/getGongdi", {
        params: this.gongchengData
      });
      // console.log(dt);
      this.shigongData.prj_name = this.gongchengData.prj_name;
      this.shigongData.prj_addr = dt.prj_addr;
      this.shigongData.prj_type = dt.prj_type;
    },
    async yijiao() {
      this.shigongData.prj_state = "1";
      var { data: dt } = await this.$http.post(
        "wx/saveGongdi_info",
        this.shigongData
      );
      if (dt != 0) {
        return this.$toast.fail({
          message: "提交失败"
        });
      }
      this.fasongData.news.articles[0].title = `小型工程移送`;
      this.fasongData.news.articles[0].description = `小型工程移送`;
      this.fasongData.news.articles[0].url = `http://103.135.160.14:8925/dist/index.html#/TransferOrder?prj_name=${this.shigongData.prj_name}`;
      // this.fasongData.new.articles[0].url =
      //   "http://47.104.29.235:8080/flower.jpeg";
      var { data: dt1 } = await this.$http.post("sendMsg", this.fasongData);

      if (dt1.data.errcode != 0) {
        return this.$toast.fail({
          message: "提交失败"
        });
      }
      localStorage.setItem("shigongData", JSON.stringify(this.shigongData));
      this.$router.push({ name: "success3" });
    },
    onSubmit() {
      // localStorage.setItem("shigongData", JSON.stringify(this.shigongData));
      // this.$router.push({ name: "success3" });
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  },
  created() {
    this.content();
  },
  beforeCreate() {
    document
      .querySelector("body")
      .setAttribute("style", "background-color:#F0F0F0FF");
  },

  beforeDestroy() {
    document.querySelector("body").removeAttribute("style");
  }
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
</style>
