<!--  -->
<template>
  <div>
    <van-nav-bar id="reset" title="一般工程" />
    <van-notice-bar color="#EC6A42" background="#F0F0F0" left-icon="info-o">
      小型工程发现上报
    </van-notice-bar>
    <van-cell-group>
      <van-field label="工程名称" :value="prj_name" readonly />
      <van-field label="工程发现单位" :value="prj_depart" readonly />
      <van-field label="工程类型" :value="prj_type" readonly />
      <van-field label="工程所属网络" :value="prj_grid" readonly />
      <van-field label="地址信息" :value="prj_addr" readonly />
    </van-cell-group>
    <div class="tupian">
      <h5>工程照片</h5>
      <van-grid :column-num="2" square :gutter="10">
        <van-grid-item text="工程照片" v-for="(item, i) in picture" :key="i">
          <van-image
            @click="show_before_img"
            width="100%"
            height="100%"
            :src="item"
          />
        </van-grid-item>
        <van-empty
          style="width:100%"
          image="error"
          description="无工程照片"
          v-if="this.picture.length == 0"
        />
      </van-grid>
    </div>
    <div style="margin: 16px;">
      <van-button
        round
        block
        type="info"
        native-type="submit"
        size="large"
        @click="queding"
      >
        确定
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
      auth: {},
      show: false,
      prj_name: "",
      prj_depart: "",
      prj_type: "",
      prj_grid: "",
      prj_addr: "",
      picture: [],

      gongchengData: {
        prj_name: ""
      },
      shouliData: {
        prj_name: "",
        prj_depart: "",
        prj_type: "",
        prj_grid: "",
        prj_addr: ""
      }
    };
  },
  //方法集合
  methods: {
    queding() {
      this.$router.push({ name: "Index" });
    },
    show_before_img() {
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
      if (this.$route.query.userid) {
        this.shouliData.userid = this.$route.query.userid;
        sessionStorage.setItem("user_id", this.shouliData.userid);
      } else {
        return this.$toast.fail({
          message: "获取用户id失败，请尝试重新进入"
        });
      }
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
        this.picture = dt.picture.split(",");
        this.picture.forEach((e, i) => {
          this.picture[i] = `http://hpimage.soyumall.cn/gongdi/file/` + e;
        });
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
  // padding: 30px;
  h5 {
    padding: 30px;
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
.van-grid {
  background: #fff;
}
</style>
