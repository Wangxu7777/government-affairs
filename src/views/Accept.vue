<!--  -->
<template>
  <div>
    <van-nav-bar id="reset" title="小型工程受理" />
    <van-notice-bar color="#EC6A42" background="#F0F0F0" left-icon="info-o">
      小型工程发现上报
    </van-notice-bar>
    <van-cell-group>
      <van-field label="工程名称" :value="prj_name" readonly />
      <van-field label="工程发现单位" :value="prj_depart" readonly />
      <van-field label="工程类型" :value="prj_type" readonly />
      <van-field label="地址信息" :value="prj_addr" readonly />
    </van-cell-group>
    <div class="tupian">
      <h5>工程照片</h5>
      <van-grid :column-num="2" square :gutter="10">
        <van-grid-item text="工程照片">
          <van-image
            @click="show_before_img"
            width="100%"
            height="100%"
            :src="picture"
          />
        </van-grid-item>
        <van-grid-item text="工程照片">
          <van-image
            @click="show_before_img"
            width="100%"
            height="100%"
            :src="picture1"
          />
        </van-grid-item>
        <van-grid-item text="工程照片">
          <van-image
            @click="show_before_img"
            width="100%"
            height="100%"
            :src="picture2"
          />
        </van-grid-item>
        <van-grid-item text="工程照片">
          <van-image
            @click="show_before_img"
            width="100%"
            height="100%"
            :src="picture3"
          />
        </van-grid-item>
        <van-grid-item text="工程照片">
          <van-image
            @click="show_before_img"
            width="100%"
            height="100%"
            :src="picture4"
          />
        </van-grid-item>
        <van-grid-item text="工程照片">
          <van-image
            @click="show_before_img"
            width="100%"
            height="100%"
            :src="picture5"
          />
        </van-grid-item>
      </van-grid>
    </div>
    <div style="margin: 16px;">
      <van-button
        round
        block
        type="info"
        native-type="submit"
        size="large"
        @click="no_shouli"
      >
        不受理
      </van-button>
    </div>
    <div style="margin: 16px;">
      <van-button
        @click="shouli"
        round
        block
        type="warning"
        native-type="submit"
        size="large"
      >
        确认受理
      </van-button>
    </div>
    <div style="margin: 16px;">
      <van-button
        @click="yiban"
        round
        block
        type="primary"
        native-type="submit"
        size="large"
      >
        一般工程
      </van-button>
    </div>
    <van-overlay :show="show" @click="show = false">
      <div class="icn">
        <icon-svg class="touxiang" icon-class="jujue1" />
      </div>
      <h1 class="text">已拒绝受理</h1>
    </van-overlay>
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
      user: {
        user_id: ""
      },
      show: false,
      prj_name: "",
      prj_depart: "",
      prj_type: "",
      prj_grid: "",
      prj_addr: "",
      picture: "",
      picture1: "",
      picture2: "",
      picture3: "",
      picture4: "",
      picture5: "",
      gongchengData: {
        prj_name: ""
      },
      shouliData: {
        prj_name: "",
        prj_depart: "",
        prj_type: "",
        prj_grid: "",
        prj_addr: "",
        picture: "",
        lng: "",
        lat: "",
        userid: ""
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
    async yiban() {
      this.shouliData.prj_state = "-4";
      var { data: dt } = await this.$http.get("/wx/saveGongdi", {
        params: this.shouliData
      });
      if (dt != 0) {
        return this.$toast.fail({
          message: "提交失败"
        });
      }
      this.$toast.success({
        message: "一般工程 已拒绝受理"
      });
      this.fasongData.news.articles[0].title = `一般工程`;
      this.fasongData.news.articles[0].description = `一般工程`;
      var qingqiuUrl = `http://hpweb.soyumall.cn/gongdi/%23/accept1?prj_name=${this.gongchengData.prj_name}`;
      this.fasongData.news.articles[0].url = `http://hptest.soyumall.cn/oauth/wx_login?callback=${qingqiuUrl}`;
      // this.fasongData.news.articles[0].url = `http://103.135.160.14:8925/dist/index.html#/accept1?prj_name=${this.gongchengData.prj_name}`;
      // this.fasongData.new.articles[0].url =
      //   "http://47.104.29.235:8080/flower.jpeg";
      var { data: dt1 } = await this.$http.post("/sendMsg", this.fasongData);

      if (dt1.data.errcode != 0) {
        return this.$toast.fail({
          message: "提交失败"
        });
      }
      this.$toast.success({
        message: "非小型工程拒绝受理"
      });
      this.$router.push({ name: "Index" });
    },
    show_before_img() {
      this.instance_before = ImagePreview({
        images: [
          this.picture,
          this.picture1,
          this.picture2,
          this.picture3,
          this.picture4,
          this.picture5
        ],
        closeable: true
      });
    },
    async shouli() {
      this.shouliData.prj_state = "-2";
      var { data: dt } = await this.$http.get("/wx/saveGongdi", {
        params: this.shouliData
      });
      if (dt != 0) {
        return this.$toast.fail({
          message: "提交失败"
        });
      }

      this.$router.push({
        path: "/information1",
        query: {
          prj_name: this.prj_name
        }
      });
    },
    async no_shouli() {
      this.shouliData.prj_state = "-3";
      var { data: dt } = await this.$http.get("/wx/saveGongdi", {
        params: this.shouliData
      });
      if (dt != 0) {
        return this.$toast.fail({
          message: "提交失败"
        });
      }

      this.fasongData.news.articles[0].title = `小型工程未受理`;
      this.fasongData.news.articles[0].description = `小型工程未受理`;
      var qingqiuUrl = `http://hpweb.soyumall.cn/gongdi/%23/transferForm?prj_name=${this.gongchengData.prj_name}`;
      this.fasongData.news.articles[0].url = `http://hptest.soyumall.cn/oauth/wx_login?callback=${qingqiuUrl}`;
      // this.fasongData.news.articles[0].url = `http://103.135.160.14:8925/dist/index.html#/transferForm?prj_name=${this.gongchengData.prj_name}`;
      // this.fasongData.new.articles[0].url =
      //   "http://47.104.29.235:8080/flower.jpeg";
      var { data: dt1 } = await this.$http.post("/sendMsg", this.fasongData);

      if (dt1.data.errcode != 0) {
        return this.$toast.fail({
          message: "提交失败"
        });
      }
      this.$toast.success({
        message: "非小型工程拒绝受理"
      });
      this.$router.push({ name: "Index" });
    },
    async content() {
      this.shouliData.userid = this.$route.query.userid;
      sessionStorage.setItem("user_id", JSON.stringify(this.shouliData.userid));
      // const gongchengData = localStorage.getItem("gongchengData");
      // this.shouliData = JSON.parse(gongchengData);
      // this.gongchengData.prj_name = this.shouliData.prj_name;
      this.gongchengData.prj_name = this.$route.query.prj_name;
      var { data: dt } = await this.$http.get("/wx/getGongdi", {
        params: this.gongchengData
      });

      this.prj_depart = dt.prj_depart;
      this.prj_name = dt.prj_name;
      this.prj_addr = dt.prj_addr;
      this.prj_grid = dt.prj_grid;
      this.prj_type = dt.prj_type;
      this.shouliData.prj_depart = dt.prj_depart;
      this.shouliData.prj_name = dt.prj_name;
      this.shouliData.prj_addr = dt.prj_addr;
      this.shouliData.prj_grid = dt.prj_grid;
      this.shouliData.prj_type = dt.prj_type;
      this.shouliData.lng = dt.location[0];
      this.shouliData.lat = dt.location[1];
      this.shouliData.picture = dt.picture;
      if (dt.picture) {
        var imgArr = dt.picture.trim().split(",");

        if (imgArr.length == 1) {
          this.picture = `http://hpimage.soyumall.cn/gongdi/file/${imgArr[0]}`;
        }
        if (imgArr.length == 2) {
          this.picture = `http://hpimage.soyumall.cn/gongdi/file/${imgArr[0]}`;
          this.picture1 = `http://hpimage.soyumall.cn/gongdi/file/${imgArr[1]}`;
        }

        if (imgArr.length == 3) {
          this.picture = `http://hpimage.soyumall.cn/gongdi/file/${imgArr[0]}`;
          this.picture1 = `http://hpimage.soyumall.cn/gongdi/file/${imgArr[1]}`;
          this.picture2 = `http://hpimage.soyumall.cn/gongdi/file/${imgArr[2]}`;
        }

        if (imgArr.length == 4) {
          this.picture = `http://hpimage.soyumall.cn/gongdi/file/${imgArr[0]}`;
          this.picture1 = `http://hpimage.soyumall.cn/gongdi/file/${imgArr[1]}`;
          this.picture2 = `http://hpimage.soyumall.cn/gongdi/file/${imgArr[2]}`;
          this.picture3 = `http://hpimage.soyumall.cn/gongdi/file/${imgArr[3]}`;
        }
        if (imgArr.length == 5) {
          this.picture = `http://hpimage.soyumall.cn/gongdi/file/${imgArr[0]}`;
          this.picture1 = `http://hpimage.soyumall.cn/gongdi/file/${imgArr[1]}`;
          this.picture2 = `http://hpimage.soyumall.cn/gongdi/file/${imgArr[2]}`;
          this.picture3 = `http://hpimage.soyumall.cn/gongdi/file/${imgArr[3]}`;
          this.picture4 = `http://hpimage.soyumall.cn/gongdi/file/${imgArr[4]}`;
        }
        if (imgArr.length == 6) {
          this.picture = `http://hpimage.soyumall.cn/gongdi/file/${imgArr[0]}`;
          this.picture1 = `http://hpimage.soyumall.cn/gongdi/file/${imgArr[1]}`;
          this.picture2 = `http://hpimage.soyumall.cn/gongdi/file/${imgArr[2]}`;
          this.picture3 = `http://hpimage.soyumall.cn/gongdi/file/${imgArr[3]}`;
          this.picture4 = `http://hpimage.soyumall.cn/gongdi/file/${imgArr[4]}`;
          this.picture5 = `http://hpimage.soyumall.cn/gongdi/file/${imgArr[5]}`;
        }
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
.tupian {
  padding: 30px;
  h5 {
    font-size: 30px;
    margin: 0;
  }
  p {
    font-size: 24px;
    text-align: center;
  }
  .zhaop {
    margin-top: 20px;
  }
}
.icn {
  height: 40vh;
  position: relative;
  .touxiang {
    width: 150px;
    height: 180px;
    position: absolute;
    left: 50%;
    top: 80%;
    transform: translate(-50%, -50%);
  }
}
.text {
  font-size: 40px;
  color: #fff;
  text-align: center;
  font-weight: 400;
}
</style>
