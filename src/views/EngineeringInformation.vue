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
        <!-- <van-row class="xuanze_box" type="flex" justify="space-around">
          <van-col class="tubiao">
            <van-field
              class="xuanzeqi"
              readonly
              clickable
              label="工程类型"
              :value="value"
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
          </van-col>
          <van-col class="tubiao">
            <van-field
              class="xuanzeqi"
              v-if="this.shoudong"
              readonly
              clickable
              label="发现单位"
              :value="value1"
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
              v-model="faxiandanwei"
              name="发现单位"
              label="发现单位"
              placeholder="选择发现单位"
              :rules="[{ required: true, message: '请填写发现单位' }]"
            />
          </van-col>
        </van-row> -->
        <van-field
          class="xuanzeqi"
          readonly
          clickable
          label="工程类型"
          :value="value"
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
          :value="value1"
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
          v-model="faxiandanwei"
          name="发现单位"
          label="发现单位"
          placeholder="输入发现单位"
          :rules="[{ required: true, message: '请填写发现单位' }]"
        />
        <van-field
          class="dizhi"
          v-model="gongchengdizhi"
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
          :value="value2"
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
            <bm-geolocation
              anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
              :showAddressBar="true"
              :autoLocation="true"
            ></bm-geolocation>
          </baidu-map>
        </div>
        <div class="shangchuan_box">
          <van-field name="uploader" label="照片上传" class="shangchuan">
            <template #input>
              <van-uploader v-model="uploader" multiple :max-count="1">
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
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      uploader: [{ url: "https://img.yzcdn.cn/vant/leaf.jpg" }],
      value: "",
      showPicker: false,
      columns: ["沿街面小型工程", "楼宇内小型工程"],
      value1: "",
      showPicker1: false,
      columns1: [
        "街道网格中心",
        "西门物业",
        "第三方市容管理部门",
        "楼宇物业",
        "请输入"
      ],
      value2: "",
      showPicker2: false,
      columns2: ["工程所属网格", "0701", "0702", "0703"],
      faxiandanwei: "",
      shoudong: true,
      shoudong1: false,
      gongchengdizhi: "",
      center: { lng: 0, lat: 0 },
      zoom: 3,
      // 这个是选择某个点的提醒以及搜索附近的东西的依据
      maptitle: "",
      // 这个是搜索下的东西
      location: "",
      // 这个是选择搜索列表中数据的title以及经纬度
      locationdata: {
        title: "",
        center: ""
      },
      geolocation: "",
      biaoji: false
    };
  },
  //   watch: {
  //     showPicker1: function(newQuestion, oldQuestion) {
  //       if (newQuestion == false && this.value1 == "请输入") {
  //         this.$refs.danweixuankbox.focus();
  //       }
  //     }
  //   },
  //方法集合
  methods: {
    submit() {},
    onClickLeft() {
      this.$router.go(-1);
    },
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
    },
    onConfirm1(value) {
      if (value == "请输入") {
        this.shoudong = false;
        this.shoudong1 = true;
      }
      this.value1 = value;
      this.showPicker1 = false;
    },
    onConfirm2(value) {
      this.value2 = value;
      this.showPicker2 = false;
    },
    async onSubmit() {
      var { data: dt } = await this.$http.post("sendMsg", this);
      console.log(dt);
    },
    handler({ BMap, map }) {
      map.enableScrollWheelZoom(); //启用滚轮放大缩小，默认禁用
      map.enableContinuousZoom(); //启用地图惯性拖拽，默认禁用
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(
        r => {
          var mk = new BMap.Marker(r.point);
          map.addOverlay(mk);
          map.panTo(r.point);
          console.log("您的位置：" + r.point.lng + "," + r.point.lat);
        },
        { enableHighAccuracy: true }
      );

      this.zoom = 15;
    }
  },
  created() {},
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
  height: 300px;
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
