<!--  -->
<template>
  <div class="box">
    <van-nav-bar
      id="reset"
      title="工程基本信息卡"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="g_box">
      <p class="shuom">
        为进一步加强限额以下小型建设工程管理，对发现的疑似小型工程，请根据提示如实填写相关信息。
      </p>
      <van-form validate-first @submit="onSubmit">
        <van-field
          style="margin-top: 30px;"
          v-model="gongchengData.prj_name"
          name="工程名称"
          label="工程名称"
          placeholder="输入工程名称"
          :rules="[
            { required: true, message: '输入工程名称' },
            { validator, message: '最多可输入16字符' }
          ]"
        />

        <van-field
          class="xuanzeqi"
          readonly
          clickable
          label="工程类型"
          :value="gongchengData.prj_type"
          placeholder="选择工程类型"
          @click="showPicker = true"
          :rules="[{ required: true, message: '请选择工程类型' }]"
        />
        <van-popup v-model="showPicker" round position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            @cancel="showPicker = false"
            @confirm="onConfirm"
          />
        </van-popup>
        <van-field
          class="xuanzeqi"
          v-if="this.shoudong"
          readonly
          clickable
          label="发现单位"
          :value="gongchengData.prj_depart"
          placeholder="选择发现单位"
          @click="showPicker1 = true"
          :rules="[{ required: true, message: '请选择发现单位' }]"
        />
        <van-popup v-model="showPicker1" round position="bottom">
          <van-picker
            show-toolbar
            :columns="columns1"
            @cancel="showPicker1 = false"
            @confirm="onConfirm1"
          />
        </van-popup>
        <van-field
          v-if="this.shoudong1"
          ref="danweixuankbox"
          v-model="gongchengData.prj_depart"
          name="发现单位"
          label="发现单位"
          placeholder="输入发现单位"
          :rules="[{ required: true, message: '请填写发现单位' }]"
        />
        <van-field
          class="dizhi"
          v-model="gongchengData.prj_addr"
          name="工程地址"
          label="工程地址"
          placeholder="输入工程地址"
          :rules="[{ required: true, message: '输入工程地址' }]"
        />

        <van-field
          id="reset1"
          class=" gongcxuan"
          readonly
          clickable
          label="工程所属网络"
          :value="gongchengData.prj_grid"
          placeholder="工程所属网络"
          @click="showPicker2 = true"
          :rules="[{ required: true, message: '请选择工程所属网络' }]"
        />
        <van-popup v-model="showPicker2" round position="bottom">
          <van-picker
            show-toolbar
            :columns="columns2"
            @cancel="showPicker2 = false"
            @confirm="onConfirm2"
          />
        </van-popup>

        <div class="map">
          <baidu-map
            class="bm-view"
            :center="center"
            :zoom="zoom"
            @ready="handler"
          >
            <bm-local-search
              :panel="false"
              :keyword="gongchengData.prj_addr"
              :auto-viewport="true"
              :selectFirstResult="true"
              @infohtmlset="qipao"
            ></bm-local-search>
            <!-- <bm-marker
              :position="center"
              :dragging="true"
              animation="BMAP_ANIMATION_BOUNCE"
            >
            </bm-marker> -->
            <!-- <bm-geolocation
              anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
              :showAddressBar="true"
              :autoLocation="true"
            ></bm-geolocation> -->
          </baidu-map>
        </div>
        <div class="shangchuan_box">
          <van-field name="uploader" label="照片上传" class="shangchuan">
            <template #input>
              <van-uploader
                :before-delete="pictureDelete"
                :before-read="beforeRead"
                :after-read="afterRead"
                v-model="uploader"
                multiple
                :max-count="6"
              >
                <icon-svg class="touxiang" icon-class="tupianshangchuan" />
              </van-uploader>
            </template>
          </van-field>
        </div>
        <div style="margin: 16px;">
          <van-button
            round
            block
            type="info"
            native-type="submit"
            size="large"
            @click="submit"
          >
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
//图片压缩文件
import { compressImage } from "../compressImage";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      str701: "",
      str702: "",
      str703: "",
      prj_name: { prj_name: "" },
      user: {
        user_id: ""
      },
      picture: [],
      gongchengData: {
        prj_state: "-100",
        prj_name: "",
        prj_type: "",
        prj_depart: "",
        prj_grid: "",
        lng: 0,
        lat: 0,
        prj_addr: "",
        picture: [],
        userid: ""
      },
      uploader: [],

      showPicker: false,
      columns: ["沿街面小型工程", "楼宇内小型工程"],

      showPicker1: false,
      columns1: [
        "街道网格中心",
        "西门物业",
        "第三方市容管理部门",
        "楼宇物业",
        "请输入"
      ],

      showPicker2: false,
      columns2: ["0701", "0702", "0703"],
      faxiandanwei: "",
      shoudong: true,
      shoudong1: false,
      center: { lng: 121.492666, lat: 31.220984 },
      zoom: 3,

      geolocation: "",
      biaoji: false,
      token: "",
      imgurl: "",
      postData: [],
      fasongData: {
        touser: "",
        // touser: "18632397636|15810457862",
        // toparty: "6899",
        msgtype: "news",
        agentid: this.$store.state.agentid,
        // image: { medis_id: "http://47.104.29.235:8080/flower.jpeg" }
        news: {
          articles: [
            {
              title: "发现小型工程，待受理",
              description: "发现小型工程，待受理",
              url: "",
              picurl: `${
                this.$store.state.xiaoxitu
              }${require("../assets/img/fasongxinxitu.png")}`
            }
          ]
        }
      },
      user_id: "",
      uploading: false
    };
  },
  // watch: {
  //   "gongchengData.prj_addr": {
  //     handler(val, oldVal) {
  //       this.handler();
  //     },
  //     deep: true
  //   }
  // },
  //方法集合
  methods: {
    //删除图片
    pictureDelete(file) {
      if (file.file) {
        this.picture.forEach(e => {
          if (e.name === file.file.name) {
            this.picture.splice(e, 1);
          }
        });

        return true;
      } else {
        this.picture.forEach(e => {
          if (e.name === file.url) {
            this.picture.splice(e, 1);
          }
        });

        return true;
      }
    },
    //压缩图片上传
    _compressAndUploadFile(file) {
      compressImage(file.content).then(result => {
        // console.log("压缩后的结果", result); // result即为压缩后的结果
        // console.log("压缩前大小", file.file.size);
        // console.log("压缩后大小", result.size);
        if (result.size > file.file.size) {
          // console.log("上传原图");
          //压缩后比原来更大，则将原图上传
          this._uploadFile(file.file, file.file.name, file);
        } else {
          //压缩后比原来小，上传压缩后的
          // console.log("上传压缩图");
          this._uploadFile(result, file.file.name, file);
        }
      });
    },

    //上传图片
    _uploadFile(file, filename, files) {
      let params = new FormData();
      params.append("file", file, filename);
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      axios
        .post(
          // `${this.$http.defaults.baseURL}/upload/addimg`,
          `http://hpimage.soyumall.cn/gongdi/general/upload`,
          params,
          config
        )
        .then(response => {
          if (response.data.status != 200) {
            files.status = "failed";
            files.message = "上传失败";
            return this.$toast.fail({
              message: "上传图片失败"
            });
          }
          let picture = {
            name: filename,
            UpName: response.data.data.result
          };

          this.picture.push(picture);
        });
    },
    //获取经纬度
    qipao(poi) {
      this.gongchengData.lng = poi.point.lng;
      this.gongchengData.lat = poi.point.lat;
    },

    //校验格式
    beforeRead(file) {
      if (
        file.type !== "image/jpeg" &&
        file.type !== "image/png" &&
        file.type !== "image/jpg" &&
        file.type !== "image/bmp" &&
        file.type !== "image/tif" &&
        file.type !== "image/gif" &&
        file.type !== "image/pcx" &&
        file.type !== "image/tga"
      ) {
        this.$toast.fail({
          message: "只可上传图片格式的文件"
        });
        return false;
      }
      return true;
    },
    validator(val) {
      // console.log(val.length);

      return val.length < 16;

      // return /1\d{10}/.test(val);
    },
    //上传图片
    afterRead(file) {
      // console.log(file.file);
      // file.status = "uploading";
      // file.message = "上传中...";

      //区分单文件上传还是多文件
      // if (file instanceof Array && file.length) {
      //   for (let i = 0; i < file.length; i++) {
      //     param.append("files", file[i].file);
      //   }
      // } else {
      //   param.append("file", file.file); // 通过append向form对象添加数据
      // }

      this._compressAndUploadFile(file);

      // console.log(param.get("file"));
    },

    submit() {},
    onClickLeft() {
      this.$router.go(-1);
    },
    onConfirm(value) {
      this.gongchengData.prj_type = value;
      this.showPicker = false;
    },
    onConfirm1(value) {
      if (value == "请输入") {
        this.shoudong = false;
        this.shoudong1 = true;
        this.showPicker1 = false;
      } else {
        this.gongchengData.prj_depart = value;
        this.showPicker1 = false;
      }
    },
    onConfirm2(value) {
      this.gongchengData.prj_grid = value;
      this.showPicker2 = false;
    },
    //发送信息
    async fasong() {
      // if (this.gongchengData.prj_grid === "0701") {
      //   this.fasongData.touser = "13701729933|13917049911|13301608675";
      // }
      // if (this.gongchengData.prj_grid === "0702") {
      //   this.fasongData.touser = "13917049911|13918853364|13301608675";
      // }
      // if (this.gongchengData.prj_grid === "0703") {
      //   this.fasongData.touser = "13795300984";
      // }
      if (this.gongchengData.prj_grid === "0701") {
        this.fasongData.touser = this.str701;
      }
      if (this.gongchengData.prj_grid === "0702") {
        this.fasongData.touser = this.str702;
      }
      if (this.gongchengData.prj_grid === "0703") {
        this.fasongData.touser = this.str703;
      }
      this.fasongData.news.articles[0].url = `${this.$store.state.articlesUrl}${this.$store.state.qingqiuUrl}/accept?prj_name=${this.gongchengData.prj_name}&du_msg=1`;
      this.fasongData.news.articles[0].description = this.gongchengData.prj_name;
      var { data: dt } = await this.$http.post("/sendMsg", this.fasongData);
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
      // localStorage.setItem("gongchengData", JSON.stringify(this.gongchengData));
      this.$router.push({
        name: "success",
        query: {
          prj_name: this.gongchengData.prj_name
        }
      });
    },
    async onSubmit() {
      //赋值给需要提交的属性
      this.gongchengData.picture = [];
      this.picture.forEach(e => {
        this.gongchengData.picture.push(e.UpName);
      });

      this.gongchengData.picture = this.gongchengData.picture.toString();
      this.gongchengData.lng = this.gongchengData.lng.toString();
      this.gongchengData.lat = this.gongchengData.lat.toString();

      var { data: dt } = await this.$http.get("/wx/saveGongdi", {
        params: this.gongchengData
      });

      if (dt !== 0) {
        return this.$toast.fail({
          message: "提交失败"
        });
      }
      //提交成功发送信息
      this.fasong();
    },
    handler({ BMap, map }) {
      map.enableScrollWheelZoom(); //启用滚轮放大缩小，默认禁用
      map.enableContinuousZoom(); //启用地图惯性拖拽，默认禁用
      // var geolocation = new BMap.Geolocation();
      var geoc = new BMap.Geocoder();

      // geolocation.getCurrentPosition(
      //   r => {
      //     var mk = new BMap.Marker(r.point);
      //     map.addOverlay(mk);
      //     map.panTo(r.point);
      //     this.gongchengData.lng = r.point.lng;
      //     this.gongchengData.lat = r.point.lat;
      //     geoc.getLocation(r.point, rs => {
      //       // var addComp = rs.addressComponents;
      //       // console.log(rs);
      //       //   this.gongchengdizhi =
      //       //     addComp.province +
      //       //     ", " +
      //       //     addComp.city +
      //       //     ", " +
      //       //     addComp.district +
      //       //     ", " +
      //       //     addComp.street +
      //       //     ", " +
      //       //     addComp.streetNumber;
      //       this.gongchengData.prj_addr = rs.address;
      //     });
      //   },
      //   { enableHighAccuracy: true }
      // );

      this.zoom = 15;

      map.addEventListener("click", e => {
        map.clearOverlays();
        var point = new BMap.Point(e.point.lng, e.point.lat);
        // points.push(new BMap.Point(e.point.lng, e.point.lat));
        this.gongchengData.lng = e.point.lng;
        this.gongchengData.lat = e.point.lat;
        geoc.getLocation(point, rs => {
          // var addComp = rs.addressComponents;
          // console.log(rs);
          //   this.gongchengdizhi =
          //     addComp.province +
          //     ", " +
          //     addComp.city +
          //     ", " +
          //     addComp.district +
          //     ", " +
          //     addComp.street +
          //     ", " +
          //     addComp.streetNumber;
          this.gongchengData.prj_addr = rs.address;
        });

        var marker = new BMap.Marker(point);
        //给覆盖物添加右键菜单
        var removeMarker = function() {
          map.clearOverlays();
        };
        //创建右键菜单
        var markerMenu = new BMap.ContextMenu();
        markerMenu.addItem(
          new BMap.MenuItem("删除", removeMarker.bind(marker))
        );
        map.addOverlay(marker);
        marker.addContextMenu(markerMenu);
      });
    },
    //获取id,工程名
    async content() {
      const user_id = sessionStorage.getItem("user_id");
      this.gongchengData.userid = JSON.parse(user_id);
      //判断是否有传值
      if (this.$route.query.prj_name) {
        this.prj_name.prj_name = this.$route.query.prj_name;
        var { data: dt } = await this.$http.get("/wx/getGongdi", {
          params: this.prj_name
        });
        this.gongchengData.prj_depart = dt.prj_depart;
        this.gongchengData.prj_name = dt.prj_name;
        this.gongchengData.prj_addr = dt.prj_addr;
        this.gongchengData.prj_grid = dt.prj_grid;
        this.gongchengData.prj_type = dt.prj_type;
        this.gongchengData.prj_depart = dt.prj_depart;

        this.gongchengData.prj_state = dt.prj_state;
        this.gongchengData.lng = dt.location[0];
        this.gongchengData.lat = dt.location[1];

        if (dt.picture) {
          let imgArr = dt.picture.trim().split(",");

          imgArr.forEach(e => {
            this.uploader.push({
              url: `http://hpimage.soyumall.cn/gongdi/file/${e}`
            });
            let picture = {
              name: `http://hpimage.soyumall.cn/gongdi/file/${e}`,
              UpName: e
            };
            this.picture.push(picture);
          });
        }
      }
    },
    //发送消息人员查询
    async fasongUser() {
      let step = { step: "发现工程" };
      const { data: dt } = await this.$http.get(
        "user/query_msgUserByUserStep",
        { params: step }
      );
      if (dt.retcode != "0") {
        return this.$toast.fail({
          message: "获取发送消息人员失败"
        });
      }
      let faxian701 = dt.data.filter(item => {
        return item.grid == "701";
      });
      this.str701 = faxian701
        .map(obj => {
          return obj.userid;
        })
        .join("|");
      let faxian702 = dt.data.filter(item => {
        return item.grid == "702";
      });
      this.str702 = faxian702
        .map(obj => {
          return obj.userid;
        })
        .join("|");
      let faxian703 = dt.data.filter(item => {
        return item.grid == "703";
      });

      this.str703 = faxian703
        .map(obj => {
          return obj.userid;
        })
        .join("|");
    }
  },
  created() {
    // this.tokenData();
    this.content();
    this.fasongUser();
  },
  beforeCreate() {
    document
      .querySelector("body")
      .setAttribute("style", "background-color:#f3f7fa");
  },

  beforeDestroy() {
    document.querySelector("body").removeAttribute("style");
  }
};
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.box {
  background: #f3f7fa;
}
.g_box {
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
.shuom {
  font-size: 14px;
  color: #666666;
}
.xuanze_box {
  margin-top: 30px;
}

.dizhi {
  margin-top: 30px;
  display: inline-block;
  vertical-align: middle;
}
.bm-view {
  width: 100%;
  height: 500px;
}
.map {
  margin-top: 30px;
}
.shangchuan {
  display: inline-block;
  vertical-align: middle;
  margin-top: 30px;
  background: rgba(243, 247, 250, 1);
}
.touxiang {
  width: 128px;
  height: 108px;
}
.gongcxuan {
  margin-top: 30px;
}
#reset1 /deep/.van-field__label {
  width: 4.4rem !important;
}
.xuanzeqi {
  margin-top: 30px;
}
</style>
