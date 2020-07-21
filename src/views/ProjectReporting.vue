<!--  -->
<template>
  <div>
    <van-nav-bar
      id="reset"
      title="小型工程发现上报"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-notice-bar color="#EC6A42" background="#F0F0F0" left-icon="info-o">
      小型工程发现上报
    </van-notice-bar>
    <van-cell-group>
      <van-field label="工程名称" :value="prj_name" readonly />
      <van-field label="工程发现单位" :value="prj_depart" readonly />
      <van-field label="工程类型" :value="prj_type" readonly />
      <van-field label="地址信息" :value="prj_addr" readonly />
      <van-field label="工程所属网络" :value="prj_grid" readonly />
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
        @click="xiugai"
      >
        信息修改
      </van-button>
    </div>
    <div style="margin: 16px;">
      <van-button
        @click="shouye"
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
</template>

<script>
import { ImagePreview } from "vant";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      prj_name: "",
      prj_depart: "",
      prj_grid: "",
      prj_addr: "",
      prj_type: "",
      picture: "",
      picture1: "",
      picture2: "",
      picture3: "",
      picture4: "",
      picture5: "",
      gongchengData: {
        prj_name: ""
      },
      gongchengData1: {}
    };
  },
  //方法集合
  methods: {
    onClickLeft() {
      this.$router.go(-1);
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
    async content() {
      const gongchengData = localStorage.getItem("gongchengData");
      if (gongchengData) {
        this.gongchengData1 = JSON.parse(gongchengData);
        this.gongchengData.prj_name = this.gongchengData1.prj_name;
      } else {
        this.gongchengData.prj_name = this.$route.query.prj_name;
        // this.prj_state = this.$route.query.prj_state;
      }

      var { data: dt } = await this.$http.get("wx/getGongdi", {
        params: this.gongchengData
      });
      if (dt === -1) {
        return this.$toast.fail({
          message: "获取失败或无此工程"
        });
      }
      this.prj_depart = dt.prj_depart;
      this.prj_name = dt.prj_name;
      this.prj_addr = dt.prj_addr;
      this.prj_grid = dt.prj_grid;
      this.prj_type = dt.prj_type;
      this.prj_state = dt.prj_state;
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
    },
    xiugai() {
      this.$router.push({ name: "EngineeringInformation" });
    },
    shouye() {
      this.$router.push({ name: "Index" });
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
</style>
