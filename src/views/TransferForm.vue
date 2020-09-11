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
        v-model="shigongData.prj_price"
        name="合同造价"
        label="合同造价"
        placeholder="合同造价"
      />
      <van-field
        v-model="shigongData.prj_check"
        name="基本违法、违规情况"
        label="基本违法、违规情况"
        placeholder="基本违法、违规情况"
        autosize
        type="textarea"
      />
      <p>工程照片</p>
      <van-grid :column-num="2" square :gutter="10">
        <van-grid-item text="工程照片" v-for="(item, i) in picture" :key="i">
          <van-image @click="show_img" width="100%" height="100%" :src="item" />
        </van-grid-item>
        <van-empty
          style="width:100%"
          image="error"
          description="无工程照片"
          v-if="this.picture.length == 0"
        />
      </van-grid>
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
import { ImagePreview } from "vant";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      userid: "",
      xiaoxirenyuan: "",
      picture: [],

      shigongData: {
        // userid: "",
        // prj_name: "",
        // prj_addr: "",
        // prj_area: "",
        // prj_price: "",
        // demand_com: "",
        // construction_com: "",
        // supervison_com: "",
        // design_rom: "",
        // prj_check: "",
        // contract_price: "",
        // prj_state: ""
      },

      showCalendar: false,
      showCalendar1: false,
      gongchengData: {
        prj_name: ""
      },
      fasongData: {
        // touser: "13413156908",
        touser: "",
        // toparty: "6899",
        msgtype: "news",
        agentid: this.$store.state.agentid,
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
    show_img() {
      this.instance_before = ImagePreview({
        images: this.picture,

        closeable: true
      });
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
      const userid = sessionStorage.getItem("user_id");
      if (userid) {
        this.userid = JSON.parse(userid);
      } else {
        this.userid = this.$route.query.userid;

        sessionStorage.setItem("user_id", this.$route.query.userid);
      }
      this.gongchengData.prj_name = this.$route.query.prj_name;
      var { data: dt } = await this.$http.get("wx/getGongdi_info", {
        params: this.gongchengData
      });
      // console.log(dt);
      this.shigongData = dt;
      // this.shigongData.prj_name = this.gongchengData.prj_name;
      // this.shigongData.prj_addr = dt.prj_addr;
      // this.shigongData.prj_type = dt.prj_type;
      // this.shigongData.prj_person_name = dt.prj_person_name;
      // this.shigongData.prj_person_phone = dt.prj_person_phone;
      // this.shigongData.prj_area = dt.prj_area;
      // this.shigongData.prj_price = dt.prj_price;
      if (dt.picture) {
        this.picture = dt.picture.split(",");
        this.picture.forEach((e, i) => {
          this.picture[i] = `http://hpimage.soyumall.cn/gongdi/file/` + e;
        });
      }
    },
    //发送信息
    async fasong() {
      // this.fasongData.touser = "13917332229";
      this.fasongData.touser = this.xiaoxirenyuan;
      this.fasongData.news.articles[0].title = `非小型工程移送`;

      this.fasongData.news.articles[0].url = `${this.$store.state.articlesUrl}${this.$store.state.qingqiuUrl}/transferOrder?prj_name=${this.shigongData.prj_name}&du_msg=1`;
      this.fasongData.news.articles[0].description = this.shigongData.prj_name;
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
      this.$router.push({
        name: "success3",
        query: {
          prj_name: this.shigongData.prj_name
        }
      });
    },
    async yijiao() {
      delete this.shigongData.updateTime;
      delete this.shigongData.__v;
      delete this.shigongData._id;
      this.shigongData.prj_state = "1";
      this.shigongData.userid = this.userid;
      // console.log(this.shigongData);
      var { data: dt } = await this.$http.post(
        "wx/saveGongdi_info",
        this.shigongData
      );
      if (dt.retcode == "-2") {
        return this.$toast.fail({
          message: "项目已被处理"
        });
      }
      if (dt !== 0) {
        return this.$toast.fail({
          message: "提交失败"
        });
      }
      this.fasong();
    },
    onSubmit() {
      // localStorage.setItem("shigongData", JSON.stringify(this.shigongData));
      // this.$router.push({ name: "success3" });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    //发送消息人员查询
    async fasongUser() {
      let step = { step: "非小型工程移交" };
      const { data: dt } = await this.$http.get(
        "user/query_msgUserByUserStep",
        { params: step }
      );
      if (dt.retcode != "0") {
        return this.$toast.fail({
          message: "获取发送消息人员失败"
        });
      }

      let feixiaoxing = dt.data.filter(item => {
        return item.depart == "街道办";
      });
      this.xiaoxirenyuan = feixiaoxing
        .map(obj => {
          return obj.userid;
        })
        .join("|");
    }
  },
  created() {
    this.content();
    this.fasongUser();
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
.van-grid {
  background: #fff;
}
</style>
