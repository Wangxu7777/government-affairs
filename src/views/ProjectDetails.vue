<!--  -->
<template>
  <div>
    <van-nav-bar
      id="reset"
      title="完整工程施工信息单"
      left-arrow
      @click-left="onClickLeft"
    />
    <p>工程施工信息</p>
    <div class="biaoti">
      <icon-svg class="icn_box" icon-class="shenhe" style="margin-right:10px" />
      <span v-if="this.prj_state == '-2'">已受理，待审核</span>
      <span v-if="this.prj_state == '-22'">已受理，待审核</span>
      <span v-if="this.prj_state == '0'">已受理，审核通过</span>
      <span v-if="this.prj_state == '-1'">已受理，审核未通过</span>
      <span v-if="this.prj_state == '1'">正在移交</span>
      <span v-if="this.prj_state == '2'">不同意移交</span>
      <span v-if="this.prj_state == '3'">同意移交</span>
      <span v-if="this.prj_state == '4'">不同意接收</span>
      <span v-if="this.prj_state == '5'">同意接收</span>
      <span v-if="this.prj_state == '7'">检查合格</span>
      <span v-if="this.prj_state == '6'">检查不合格</span>
      <span v-if="this.prj_state == '8'">已竣工</span>
    </div>
    <van-cell-group>
      <van-field label="工程名称" :value="prj_name" readonly />
      <van-field label="工程地址" :value="prj_addr" readonly />
      <van-field label="工程类型" :value="prj_type" readonly />
      <van-field label="工程面积" :value="prj_area" readonly />
      <van-field label="合同造价" :value="prj_price" readonly />
      <van-field label="建设单位" :value="demand_com" readonly />
      <van-field label="施工单位" :value="construction_com" readonly />
      <van-field label="监理单位" :value="supervison_com" readonly />
      <van-field label="设计单位" :value="design_rom" readonly />

      <van-field label="开工日期" :value="start_date" readonly />
      <van-field label="竣工日期" :value="completion_date" readonly />
    </van-cell-group>
    <p>监督单位信息</p>
    <van-cell-group>
      <van-field label="单位名称" :value="fbi_name" readonly />
      <van-field label="监督电话" :value="fbi_phone" readonly />
    </van-cell-group>
    <p>负责人信息</p>
    <van-cell-group>
      <van-field label="姓名" :value="prj_person_name" readonly />
      <van-field label="联系方式" :value="prj_person_phone" readonly />
    </van-cell-group>
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
    <p>工程文件</p>
    <van-row class="buju" gutter="20">
      <van-col span="6" @click="show_before_img">
        <div class="beijinkuai">
          <div class="beijin">
            <van-icon
              name="notes-o"
              :badge="
                this.prj_property.length == 0 ? '' : this.prj_property.length
              "
            />
          </div>
        </div>

        <p class="wenjianming">产权证</p>
      </van-col>
      <van-col span="6" @click="show_before_img1">
        <div class="beijinkuai">
          <div class="beijin">
            <van-icon
              name="notes-o"
              :badge="
                this.prj_lease_contract.length == 0
                  ? ''
                  : this.prj_lease_contract.length
              "
            />
          </div>
        </div>

        <p class="wenjianming">租赁合同</p>
      </van-col>
      <van-col span="6" @click="show_before_img2">
        <div class="beijinkuai">
          <div class="beijin">
            <van-icon
              name="notes-o"
              :badge="
                this.prj_con_contract.length == 0
                  ? ''
                  : this.prj_con_contract.length
              "
            />
          </div>
        </div>

        <p class="wenjianming">施工合同</p>
      </van-col>
      <van-col span="6" @click="show_before_img3">
        <div class="beijinkuai">
          <div class="beijin">
            <van-icon
              name="notes-o"
              :badge="
                this.prj_license.length == 0 ? '' : this.prj_license.length
              "
            />
          </div>
        </div>

        <p class="wenjianming">施工单位营业执照</p>
      </van-col>
    </van-row>
    <van-row class="buju" gutter="20">
      <van-col span="6" @click="show_before_img4">
        <div class="beijinkuai">
          <div class="beijin">
            <van-icon
              name="notes-o"
              :badge="
                this.prj_certifications.length == 0
                  ? ''
                  : this.prj_certifications.length
              "
            />
          </div>
        </div>

        <p class="wenjianming">施工单位资质证书</p>
      </van-col>
      <van-col span="6" @click="show_before_img5">
        <div class="beijinkuai">
          <div class="beijin">
            <van-icon
              name="notes-o"
              :badge="
                this.prj_manager_cert.length == 0
                  ? ''
                  : this.prj_manager_cert.length
              "
            />
          </div>
        </div>

        <p class="wenjianming">项目经理证书</p>
      </van-col>
      <van-col span="6" @click="show_before_img6">
        <div class="beijinkuai">
          <div class="beijin">
            <van-icon
              name="notes-o"
              :badge="
                this.prj_safe_cert.length == 0 ? '' : this.prj_safe_cert.length
              "
            />
          </div>
        </div>

        <p class="wenjianming">安全员证书</p>
      </van-col>
      <van-col span="6" @click="show_before_img7">
        <div class="beijinkuai">
          <div class="beijin">
            <van-icon
              name="notes-o"
              :badge="
                this.prj_manager_appiontment.length == 0
                  ? ''
                  : this.prj_manager_appiontment.length
              "
            />
          </div>
        </div>

        <p class="wenjianming">项目经理任命文件</p>
      </van-col>
    </van-row>
    <van-row class="buju" gutter="20">
      <van-col span="6" @click="show_before_img8">
        <div class="beijinkuai">
          <div class="beijin">
            <van-icon
              name="notes-o"
              :badge="
                this.prj_safe_appiontment.length == 0
                  ? ''
                  : this.prj_safe_appiontment.length
              "
            />
          </div>
        </div>

        <p class="wenjianming">安全员任命文件</p>
      </van-col>
      <van-col span="6" @click="show_before_img9">
        <div class="beijinkuai">
          <div class="beijin">
            <van-icon
              name="notes-o"
              :badge="
                this.prj_design_cert.length == 0
                  ? ''
                  : this.prj_design_cert.length
              "
            />
          </div>
        </div>

        <p class="wenjianming">设计单位资质文件</p>
      </van-col>
    </van-row>

    <!-- <div
      v-if="
        this.prj_state == '0' || this.prj_state == '6' || this.prj_state == '7'
      "
      style="margin: 16px;"
    >
      <van-button @click="jiludan" round block type="info" native-type="submit">
        填写工程检查记录单
      </van-button>
    </div> -->
    <div style="margin: 16px;">
      <van-button
        class="shouye"
        @click="shouye"
        round
        block
        type="info"
        native-type="submit"
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
      auth: {},
      picture: [],

      userid: "",
      prj_name: "",
      prj_addr: "",
      prj_type: "",
      prj_area: "",
      prj_price: "",
      demand_com: "",
      construction_com: "",
      supervison_com: "",
      design_rom: "",
      start_date: "",
      completion_date: "",
      fbi_name: "",
      fbi_phone: "",
      prj_person_name: "",
      prj_person_phone: "",
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
      shigongData2: {},
      prj_state: ""
    };
  },
  //方法集合
  methods: {
    jiludan() {
      this.$router.push({
        path: "/supervise",
        query: {
          prj_name: this.prj_name
        }
      });
    },
    show_img() {
      this.instance_before = ImagePreview({
        images: this.picture,

        closeable: true
      });
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
    shouye() {
      this.$router.push({ name: "Index" });
    },
    async content() {
      const userid = sessionStorage.getItem("user_id");

      if (userid) {
        this.userid = JSON.parse(userid);
      } else {
        this.userid = this.$route.query.userid;

        sessionStorage.setItem("user_id", this.$route.query.userid);
      }
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
      var { data: dt } = await this.$http.get("/wx/getGongdi_info", {
        params: this.shigongData
      });
      if (dt === -1) {
        return this.$toast.fail({
          message: "获取失败或无此工程"
        });
      }
      this.prj_state = dt.prj_state;
      this.prj_name = dt.prj_name;
      this.prj_addr = dt.prj_addr;
      this.prj_type = dt.prj_type;
      this.prj_area = dt.prj_area;
      this.prj_price = dt.prj_price;
      this.demand_com = dt.demand_com;
      this.construction_com = dt.construction_com;
      this.supervison_com = dt.supervison_com;
      this.design_rom = dt.design_rom;
      this.start_date = dt.start_date;
      this.completion_date = dt.completion_date;
      this.fbi_name = dt.fbi_name;
      this.fbi_phone = dt.fbi_phone;
      this.prj_person_name = dt.prj_person_name;
      this.prj_person_phone = dt.prj_person_phone;
      this.prj_assist_org = dt.prj_assist_org;
      if (dt.picture) {
        if (dt.picture) {
          this.picture = dt.picture.split(",");
          this.picture.forEach((e, i) => {
            this.picture[i] = `http://hpimage.soyumall.cn/gongdi/file/` + e;
          });
        }
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
    onClickLeft() {
      this.$router.go(-1);
    }
  },
  created() {
    this.content();
  },
  beforeRouteLeave(to, from, next) {
    //设置下一个路由的meta,让列表页面缓存,即不刷新

    to.meta.keepAlive = true;

    next();
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
// .beijin {
//   position: relative;
//   height: 110px;
//   background: rgba(249, 249, 249, 1);
//   box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.09);
//   border-radius: 10px;
// }
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
.shouye {
  background: linear-gradient(
    -90deg,
    rgba(253, 204, 2, 1) 0%,
    rgba(255, 235, 0, 1) 100%
  );
  color: #343434ff;
  border: 0;
}
.beijinkuai {
  text-align: center;
}
.beijin {
  display: inline-block;
  width: 60px;
  height: 60px;
  background: rgba(0, 129, 255, 1);
  opacity: 0.5;
  border-radius: 50%;
  line-height: 60px;
  text-align: center;
  .van-icon {
    color: #fff;
    font-size: 22px;
    line-height: 30px;
  }
}
</style>
