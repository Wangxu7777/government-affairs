<!--  -->
<template>
  <div>
    <van-nav-bar
      id="reset"
      title="主任查看工程资质文件"
      left-arrow
      @click-left="onClickLeft"
    />
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
    <van-collapse v-model="activeNames">
      <van-collapse-item title="产权证" name="1">
        <van-row class="buju" gutter="20">
          <van-col
            span="12"
            :key="index"
            v-for="(item, index) in prj_property"
            @click="show_before_img"
          >
            <div class="beijin">
              <van-image width="100%" height="100%" :src="item" />
            </div>
          </van-col>
        </van-row>
      </van-collapse-item>
      <van-collapse-item title="租赁合同" name="2">
        <van-row class="buju" gutter="20">
          <van-col
            span="12"
            :key="index"
            v-for="(item, index) in prj_lease_contract"
            @click="show_before_img1"
          >
            <div class="beijin">
              <van-image width="100%" height="100%" :src="item" />
            </div>
          </van-col>
        </van-row>
      </van-collapse-item>
      <van-collapse-item title="施工合同" name="3">
        <van-row class="buju" gutter="20">
          <van-col
            span="12"
            :key="index"
            v-for="(item, index) in prj_con_contract"
            @click="show_before_img2"
          >
            <div class="beijin">
              <van-image width="100%" height="100%" :src="item" />
            </div>
          </van-col>
        </van-row>
      </van-collapse-item>
      <van-collapse-item title="施工单位营业执照" name="4">
        <van-row class="buju" gutter="20">
          <van-col
            span="12"
            :key="index"
            v-for="(item, index) in prj_license"
            @click="show_before_img3"
          >
            <div class="beijin">
              <van-image width="100%" height="100%" :src="item" />
            </div>
          </van-col>
        </van-row>
      </van-collapse-item>
      <van-collapse-item title="施工单位资质证书" name="5">
        <van-row class="buju" gutter="20">
          <van-col
            span="12"
            :key="index"
            v-for="(item, index) in prj_certifications"
            @click="show_before_img4"
          >
            <div class="beijin">
              <van-image width="100%" height="100%" :src="item" />
            </div>
          </van-col>
        </van-row>
      </van-collapse-item>
      <van-collapse-item title="项目经理证书" name="6">
        <van-row class="buju" gutter="20">
          <van-col
            span="12"
            :key="index"
            v-for="(item, index) in prj_manager_cert"
            @click="show_before_img5"
          >
            <div class="beijin">
              <van-image width="100%" height="100%" :src="item" />
            </div>
          </van-col>
        </van-row>
      </van-collapse-item>
      <van-collapse-item title="安全员证书" name="7">
        <van-row class="buju" gutter="20">
          <van-col
            span="12"
            :key="index"
            v-for="(item, index) in prj_safe_cert"
            @click="show_before_img6"
          >
            <div class="beijin">
              <van-image width="100%" height="100%" :src="item" />
            </div>
          </van-col>
        </van-row>
      </van-collapse-item>
      <van-collapse-item title="项目经理任命文件" name="8">
        <van-row class="buju" gutter="20">
          <van-col
            span="12"
            :key="index"
            v-for="(item, index) in prj_manager_appiontment"
            @click="show_before_img7"
          >
            <div class="beijin">
              <van-image width="100%" height="100%" :src="item" />
            </div>
          </van-col>
        </van-row>
      </van-collapse-item>
      <van-collapse-item title="安全员任命文件" name="9">
        <van-row class="buju" gutter="20">
          <van-col
            span="12"
            :key="index"
            v-for="(item, index) in prj_safe_appiontment"
            @click="show_before_img8"
          >
            <div class="beijin">
              <van-image width="100%" height="100%" :src="item" />
            </div>
          </van-col>
        </van-row>
      </van-collapse-item>
      <van-collapse-item title="设计单位资质文件" name="10">
        <van-row class="buju" gutter="20">
          <van-col
            span="12"
            :key="index"
            v-for="(item, index) in prj_design_cert"
            @click="show_before_img9"
          >
            <div class="beijin">
              <van-image width="100%" height="100%" :src="item" />
            </div>
          </van-col>
        </van-row>
      </van-collapse-item>
    </van-collapse>
    <!-- <van-row class="buju" gutter="20"> -->
    <!-- <van-col span="12" @click="show_before_img">
        <div class="beijin">
          <van-image width="100%" height="100%" :src="prj_property" />
        </div>

        <p class="wenjianming">产权证</p>
      </van-col> -->
    <!-- <van-col span="12" @click="show_before_img1">
        <div class="beijin">
          <van-image width="100%" height="100%" :src="prj_lease_contract" />
        </div>

        <p class="wenjianming">租赁合同</p>
      </van-col>
    </van-row>
    <van-row class="buju" gutter="20">
      <van-col span="12" @click="show_before_img2">
        <div class="beijin">
          <van-image width="100%" height="100%" :src="prj_con_contract" />
        </div>

        <p class="wenjianming">施工合同</p>
      </van-col>
      <van-col span="12" @click="show_before_img3">
        <div class="beijin">
          <van-image width="100%" height="100%" :src="prj_license" />
        </div>

        <p class="wenjianming">施工单位营业执照</p>
      </van-col>
    </van-row>
    <van-row class="buju" gutter="20">
      <van-col span="12" @click="show_before_img4">
        <div class="beijin">
          <van-image width="100%" height="100%" :src="prj_certifications" />
        </div>

        <p class="wenjianming">施工单位资质证书</p>
      </van-col>
      <van-col span="12" @click="show_before_img5">
        <div class="beijin">
          <van-image width="100%" height="100%" :src="prj_manager_cert" />
        </div>

        <p class="wenjianming">项目经理证书</p>
      </van-col>
    </van-row>
    <van-row class="buju" gutter="20">
      <van-col span="12" @click="show_before_img6">
        <div class="beijin">
          <van-image width="100%" height="100%" :src="prj_safe_cert" />
        </div>

        <p class="wenjianming">安全员证书</p>
      </van-col>
      <van-col span="12" @click="show_before_img7">
        <div class="beijin">
          <van-image
            width="100%"
            height="100%"
            :src="prj_manager_appiontment"
          />
        </div>

        <p class="wenjianming">项目经理任命文件</p>
      </van-col>
    </van-row>
    <van-row class="buju" gutter="20">
      <van-col span="12" @click="show_before_img8">
        <div class="beijin">
          <van-image width="100%" height="100%" :src="prj_safe_appiontment" />
        </div>

        <p class="wenjianming">安全员任命文件</p>
      </van-col>
      <van-col span="12" @click="show_before_img9">
        <div class="beijin">
          <van-image width="100%" height="100%" :src="prj_design_cert" />
        </div>

        <p class="wenjianming">设计单位资质文件</p>
      </van-col>
    </van-row> -->

    <div style="margin: 16px;margin-bottom: 0;">
      <van-button
        @click="weitongguo"
        class="btn1"
        round
        block
        type="info"
        native-type="submit"
      >
        受理审核未通过
      </van-button>
    </div>
    <div style="margin: 16px;">
      <van-button
        @click="tongguo"
        class="btn2"
        round
        block
        type="info"
        native-type="submit"
      >
        受理审核通过
      </van-button>
    </div>
    <div style="margin: 16px;">
      <van-button
        @click="feixiaoxing"
        class="btn3"
        round
        block
        type="info"
        native-type="submit"
      >
        非小型工程
      </van-button>
    </div>
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
      feixiaoxingrenyuan: "",
      activeNames: ["1"],
      shigongUserid: "",
      party: "",
      assisStr: "",
      show: false,
      index: 0,
      images: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg"
      ],
      prj_property: [],
      prj_lease_contract: [],
      prj_con_contract: [],
      prj_license: [],
      prj_certifications: [],
      prj_manager_cert: [],
      prj_safe_cert: [],
      prj_manager_appiontment: [],
      prj_safe_appiontment: [],
      prj_design_cert: [],
      prj_assist_org: "",
      shigongData: {
        prj_name: ""
      },
      shigongData1: {},
      fasongData: {
        touser: "",
        // touser: "18632397636",
        // toparty: "",
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
    onClickLeft() {
      this.$router.go(-1);
    },
    //发送信息
    async fasong() {
      // this.fasongData.touser = "18017569958";
      this.fasongData.touser = this.feixiaoxingrenyuan;
      this.fasongData.news.articles[0].title = `非小型工程，请移交`;

      this.fasongData.news.articles[0].url = `${this.$store.state.articlesUrl}${this.$store.state.qingqiuUrl}/transferForm?prj_name=${this.shigongData.prj_name}&du_msg=1`;
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

      localStorage.setItem("shigongData", JSON.stringify(this.shigongData1));
      this.$router.push({
        name: "success2",
        query: {
          prj_name: this.shigongData.prj_name
        }
      });
    },
    async feixiaoxing() {
      this.shigongData1.prj_state = "1";
      var { data: dt } = await this.$http.post(
        "wx/saveGongdi_info",
        this.shigongData1
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
    //发送信息
    async fasong1() {
      // if (this.party) {
      //   this.fasongData.toparty = this.party;
      // }
      let assis;
      if (this.assisStr) {
        assis = this.assisStr + "|";
      }

      this.fasongData.touser = assis + this.shigongUserid;
      this.fasongData.news.articles[0].title = `小型工程受理审核通过`;

      this.fasongData.news.articles[0].url = `${this.$store.state.articlesUrl}${this.$store.state.qingqiuUrl}/projectDetails?prj_name=${this.shigongData.prj_name}&du_msg=1`;
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

      localStorage.setItem("shigongData", JSON.stringify(this.shigongData1));
      this.$router.push({
        name: "success2",
        query: {
          prj_name: this.shigongData.prj_name
        }
      });
    },
    async tongguo() {
      this.shigongData1.prj_state = "0";
      var { data: dt } = await this.$http.post(
        "wx/saveGongdi_info",
        this.shigongData1
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

      this.fasong1();
    },
    //发送信息
    async fasong2() {
      this.fasongData.touser = this.shigongUserid;
      this.fasongData.news.articles[0].title = `小型工地受理审核，未通过。`;

      this.fasongData.news.articles[0].url = `${this.$store.state.articlesUrl}${this.$store.state.qingqiuUrl}/information1?prj_name=${this.shigongData.prj_name}&du_msg=1`;
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

      localStorage.setItem("shigongData", JSON.stringify(this.shigongData1));
      this.$router.push({
        name: "success2",
        query: {
          prj_name: this.shigongData.prj_name
        }
      });
    },
    async weitongguo() {
      this.shigongData1.prj_state = "-1";
      var { data: dt } = await this.$http.post(
        "wx/saveGongdi_info",
        this.shigongData1
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

      this.fasong2();
    },
    show_before_img() {
      this.instance_before = ImagePreview({
        images: this.prj_property,
        closeable: true
      });
    },
    show_before_img1() {
      this.instance_before = ImagePreview({
        images: this.prj_lease_contract,
        closeable: true
      });
    },
    show_before_img2() {
      this.instance_before = ImagePreview({
        images: this.prj_con_contract,
        closeable: true
      });
    },
    show_before_img3() {
      this.instance_before = ImagePreview({
        images: this.prj_license,
        closeable: true
      });
    },
    show_before_img4() {
      this.instance_before = ImagePreview({
        images: this.prj_certifications,
        closeable: true
      });
    },
    show_before_img5() {
      this.instance_before = ImagePreview({
        images: this.prj_manager_cert,
        closeable: true
      });
    },
    show_before_img6() {
      this.instance_before = ImagePreview({
        images: this.prj_safe_cert,
        closeable: true
      });
    },
    show_before_img7() {
      this.instance_before = ImagePreview({
        images: this.prj_manager_appiontment,
        closeable: true
      });
    },
    show_before_img8() {
      this.instance_before = ImagePreview({
        images: this.prj_safe_appiontment,
        closeable: true
      });
    },
    show_before_img9() {
      this.instance_before = ImagePreview({
        images: this.prj_design_cert,
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

      this.shigongData.prj_name = this.$route.query.prj_name;
      var { data: dt } = await this.$http.get("wx/getGongdi_info", {
        params: this.shigongData
      });
      if (dt === -1) {
        return this.$toast.fail({
          message: "获取工程失败"
        });
      }
      this.shigongUserid = dt.userid;

      this.shigongData1 = dt;
      delete this.shigongData1.updateTime;
      delete this.shigongData1.__v;
      delete this.shigongData1._id;

      const userid = sessionStorage.getItem("user_id");

      if (userid) {
        this.shigongData1.userid = JSON.parse(userid);
      } else {
        this.shigongData1.userid = this.$route.query.userid;

        sessionStorage.setItem("user_id", this.$route.query.userid);
      }

      // if (dt.prj_assist_org) {
      //   let assisMap = new Map();
      //   assisMap.set("社区平安办", "13795357839");
      //   // assisMap.set("城管中队", "202326262");
      //   assisMap.set("街道社区管理办", "18017569958");
      //   assisMap.set("第三方机构", "18616582881");
      //   // assisMap.set("灯光景观所", "");
      //   let mapArr = [];
      //   let assistArr = dt.prj_assist_org.trim().split(",");
      //   assistArr.forEach(e => {
      //     if (e === "城管中队") {
      //       this.party = "202326262";
      //     }
      //     mapArr.push(assisMap.get(e));
      //     this.assisStr = mapArr.join("|");
      //   });
      // }
      //判断是否有协同人员
      if (dt.prj_assist_org) {
        this.xietongFasongUser(dt.prj_assist_org);
      }

      if (dt.prj_property) {
        this.prj_property = dt.prj_property.split(",");
        this.prj_property.forEach((e, i) => {
          this.prj_property[i] = `http://hpimage.soyumall.cn/gongdi/file/` + e;
        });
      }

      if (dt.prj_lease_contract) {
        this.prj_lease_contract = dt.prj_lease_contract.split(",");
        this.prj_lease_contract.forEach((e, i) => {
          this.prj_lease_contract[i] =
            `http://hpimage.soyumall.cn/gongdi/file/` + e;
        });
      }
      if (dt.prj_con_contract) {
        this.prj_con_contract = dt.prj_con_contract.split(",");
        this.prj_con_contract.forEach((e, i) => {
          this.prj_con_contract[i] =
            `http://hpimage.soyumall.cn/gongdi/file/` + e;
        });
      }
      if (dt.prj_license) {
        this.prj_license = dt.prj_license.split(",");
        this.prj_license.forEach((e, i) => {
          this.prj_license[i] = `http://hpimage.soyumall.cn/gongdi/file/` + e;
        });
      }
      if (dt.prj_certifications) {
        this.prj_certifications = dt.prj_certifications.split(",");
        this.prj_certifications.forEach((e, i) => {
          this.prj_certifications[i] =
            `http://hpimage.soyumall.cn/gongdi/file/` + e;
        });
      }
      if (dt.prj_manager_cert) {
        this.prj_manager_cert = dt.prj_manager_cert.split(",");
        this.prj_manager_cert.forEach((e, i) => {
          this.prj_manager_cert[i] =
            `http://hpimage.soyumall.cn/gongdi/file/` + e;
        });
      }
      if (dt.prj_safe_cert) {
        this.prj_safe_cert = dt.prj_safe_cert.split(",");
        this.prj_safe_cert.forEach((e, i) => {
          this.prj_safe_cert[i] = `http://hpimage.soyumall.cn/gongdi/file/` + e;
        });
      }
      if (dt.prj_manager_appiontment) {
        this.prj_manager_appiontment = dt.prj_manager_appiontment.split(",");
        this.prj_manager_appiontment.forEach((e, i) => {
          this.prj_manager_appiontment[i] =
            `http://hpimage.soyumall.cn/gongdi/file/` + e;
        });
      }
      if (dt.prj_safe_appiontment) {
        this.prj_safe_appiontment = dt.prj_safe_appiontment.split(",");
        this.prj_safe_appiontment.forEach((e, i) => {
          this.prj_safe_appiontment[i] =
            `http://hpimage.soyumall.cn/gongdi/file/` + e;
        });
      }
      if (dt.prj_design_cert) {
        this.prj_design_cert = dt.prj_design_cert.split(",");
        this.prj_design_cert.forEach((e, i) => {
          this.prj_design_cert[i] =
            `http://hpimage.soyumall.cn/gongdi/file/` + e;
        });
      }
    },
    onChange(index) {
      this.index = index;
    },
    //发送消息人员查询
    async feixiaoxingFasongUser() {
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
        return item.depart == "管理办";
      });
      this.feixiaoxingrenyuan = feixiaoxing
        .map(obj => {
          return obj.userid;
        })
        .join("|");
    },
    //发送消息人员查询
    async xietongFasongUser(prj_assist_org) {
      let step = { step: "协管单位" };
      const { data: dt } = await this.$http.get(
        "user/query_msgUserByUserStep",
        { params: step }
      );
      if (dt.retcode != "0") {
        return this.$toast.fail({
          message: "获取发送消息人员失败"
        });
      }
      //判断协同人员

      let xietong = [];
      let assistArr = prj_assist_org.trim().split(",");

      dt.data.forEach(e => {
        if (assistArr.indexOf(e.depart)) {
          xietong.push(e.userid);
        }
      });

      this.assisStr = xietong.join("|");
    }
  },
  created() {
    this.content();
    this.feixiaoxingFasongUser();
  }
};
</script>
<style lang="less" scoped>
.beijin {
  position: relative;
  height: 200px;
  background: rgba(249, 249, 249, 1);
  box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.09);
  border-radius: 10px;
}
.wenjianming {
  font-size: 18px;
  color: rgba(52, 52, 52, 1);
  padding: 10px;
  background-color: #fff;
  text-align: center;
}
.buju {
  padding: 30px;
}
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
// .van-row {
//   //   height: 90px;
//   border-bottom: 1px solid #343434ff;
// }
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
