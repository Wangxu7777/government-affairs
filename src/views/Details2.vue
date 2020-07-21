<!--  -->
<template>
  <div>
    <van-nav-bar
      id="reset"
      title="小型工程检查记录单"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="biaoti">
      <span class="hege" v-if="this.prj_state == '7'">检查合格</span>
      <span class="buhege" v-if="this.prj_state == '6'">检查不合格</span>
      <span>本次审查已完成</span>
    </div>
    <van-cell-group>
      <van-field label="工程名称" :value="prj_name" readonly />
      <van-field label="工程地址" :value="prj_addr" readonly />
      <van-field label="建设单位" :value="demand_com" readonly />
      <van-field label="施工单位" :value="construction_com" readonly />
      <van-field label="监理单位" :value="supervison_com" readonly />
      <van-field label="设计单位" :value="design_rom" readonly />
      <van-field label="项目负责人" :value="prj_person_name" readonly />
      <van-field label="负责人电话" :value="prj_person_phone" readonly />
    </van-cell-group>

    <p>监督检查记录</p>
    <van-cell-group>
      <van-field label="监督检查部门" :value="check_depart" readonly />
      <van-field label="检察人员" :value="check_person" readonly />
      <van-field
        label="检查内容"
        v-model="check_content"
        type="textarea"
        autosize
        readonly
      />
      <van-field
        label="存在问题"
        v-model="check_question"
        type="textarea"
        autosize
        readonly
      />
      <van-field
        label="整改情况"
        v-model="change_desp"
        type="textarea"
        autosize
        readonly
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button @click="shouye" round block type="info" native-type="submit">
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
      check_depart: "",
      check_person: "",
      check_content: "",
      check_question: "",
      change_desp: "",

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
      prj_property: "",
      prj_lease_contract: "",
      prj_con_contract: "",
      prj_license: "",
      prj_certifications: "",
      prj_manager_cert: "",
      prj_safe_cert: "",
      prj_manager_appiontment: "",
      prj_safe_appiontment: "",
      prj_design_cert: "",
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
    show_before_img() {
      this.instance_before = ImagePreview({
        images: [this.prj_property],
        closeable: true
      });
    },
    show_before_img1() {
      this.instance_before = ImagePreview({
        images: [this.prj_lease_contract],
        closeable: true
      });
    },
    show_before_img2() {
      this.instance_before = ImagePreview({
        images: [this.prj_con_contract],
        closeable: true
      });
    },
    show_before_img3() {
      this.instance_before = ImagePreview({
        images: [this.prj_license],
        closeable: true
      });
    },
    show_before_img4() {
      this.instance_before = ImagePreview({
        images: [this.prj_certifications],
        closeable: true
      });
    },
    show_before_img5() {
      this.instance_before = ImagePreview({
        images: [this.prj_manager_cert],
        closeable: true
      });
    },
    show_before_img6() {
      this.instance_before = ImagePreview({
        images: [this.prj_safe_cert],
        closeable: true
      });
    },
    show_before_img7() {
      this.instance_before = ImagePreview({
        images: [this.prj_manager_appiontment],
        closeable: true
      });
    },
    show_before_img8() {
      this.instance_before = ImagePreview({
        images: [this.prj_safe_appiontment],
        closeable: true
      });
    },
    show_before_img9() {
      this.instance_before = ImagePreview({
        images: [this.prj_design_cert],
        closeable: true
      });
    },
    shouye() {
      this.$router.push({ name: "Index" });
    },
    async content() {
      const shigongData = localStorage.getItem("shigongData");
      if (shigongData) {
        this.shigongData1 = JSON.parse(shigongData);
        this.shigongData.prj_name = this.shigongData1.prj_name;
      } else {
        this.shigongData.prj_name = this.$route.query.prj_name;
      }

      var { data: dt } = await this.$http.get("/wx/getGongdi_info", {
        params: this.shigongData
      });

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
      this.check_depart = dt.check_depart;
      this.check_person = dt.check_person;
      this.check_content = dt.check_content;
      this.check_question = dt.check_question;
      this.change_desp = dt.change_desp;

      if (dt.prj_lease_contract) {
        this.prj_property = `http://hpimage.soyumall.cn/gongdi/file/${dt.prj_property}`;
      }
      if (dt.prj_lease_contract) {
        this.prj_lease_contract = `http://hpimage.soyumall.cn/gongdi/file/${dt.prj_lease_contract}`;
      }
      if (dt.prj_con_contract) {
        this.prj_con_contract = `http://hpimage.soyumall.cn/gongdi/file/${dt.prj_con_contract}`;
      }
      if (dt.prj_license) {
        this.prj_license = `http://hpimage.soyumall.cn/gongdi/file/${dt.prj_license}`;
      }
      if (dt.prj_certifications) {
        this.prj_certifications = `http://hpimage.soyumall.cn/gongdi/file/${dt.prj_certifications}`;
      }
      if (dt.prj_manager_cert) {
        this.prj_manager_cert = `http://hpimage.soyumall.cn/gongdi/file/${dt.prj_manager_cert}`;
      }
      if (dt.prj_safe_cert) {
        this.prj_safe_cert = `http://hpimage.soyumall.cn/gongdi/file/${dt.prj_safe_cert}`;
      }
      if (dt.prj_manager_appiontment) {
        this.prj_manager_appiontment = `http://hpimage.soyumall.cn/gongdi/file/${dt.prj_manager_appiontment}`;
      }
      if (dt.prj_safe_appiontment) {
        this.prj_safe_appiontment = `http://hpimage.soyumall.cn/gongdi/file/${dt.prj_safe_appiontment}`;
      }
      if (dt.prj_design_cert) {
        this.prj_design_cert = `http://hpimage.soyumall.cn/gongdi/file/${dt.prj_design_cert}`;
      }
      if (dt.prj_assist_org) {
        this.prj_assist_org = `http://hpimage.soyumall.cn/gongdi/file/${dt.prj_assist_org}`;
      }
    },
    onClickLeft() {
      this.$router.go(-1);
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
  .hege {
    display: inline-block;
    width: 170px;
    height: 60px;
    font-size: 26px;
    background: linear-gradient(
      -90deg,
      rgba(109, 223, 88, 1),
      rgba(127, 234, 97, 1)
    );
    text-align: center;
    line-height: 60px;
    margin-right: 10px;
  }
  .buhege {
    display: inline-block;
    width: 170px;
    height: 60px;
    font-size: 26px;
    background: linear-gradient(
      -90deg,
      rgba(245, 63, 51, 1),
      rgba(252, 87, 76, 1)
    );
    text-align: center;
    line-height: 60px;
    margin-right: 10px;
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
</style>
