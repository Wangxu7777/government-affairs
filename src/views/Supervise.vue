<template>
  <div>
    <van-nav-bar
      id="reset"
      title="小型建设工程监督检查记录单"
      left-arrow
      @click-left="onClickLeft"
    />
    <p>工程基本信息</p>
    <van-cell-group>
      <van-field label="工程名称" :value="shigongData.prj_name" readonly />
      <van-field label="工程地址" :value="shigongData.prj_addr" readonly />
      <van-field label="建设单位" :value="shigongData.demand_com" readonly />
      <van-field
        label="施工单位"
        :value="shigongData.construction_com"
        readonly
      />
      <van-field
        label="监理单位"
        :value="shigongData.supervison_com"
        readonly
      />
      <van-field label="设计单位" :value="shigongData.design_rom" readonly />
      <van-field label="联系人姓名" :value="shigongData.fbi_name" readonly />
      <van-field label="联系人电话" :value="shigongData.fbi_phone" readonly />
      <van-field label="工程面积" :value="shigongData.prj_area" readonly />
      <van-field label="合同造价" :value="shigongData.prj_price" readonly />
      <van-field
        label="基本违法,违规情况"
        :value="shigongData.prj_check"
        readonly
      />
    </van-cell-group>
    <p>监督检查记录</p>
    <van-form validate-first @submit="onSubmit">
      <van-field
        class="xuanzeqi"
        v-if="this.shoudong"
        readonly
        clickable
        label="监督检查部门"
        :value="shigongData.check_depart"
        placeholder="选择监督检查部门"
        @click="showPicker1 = true"
        :rules="[{ required: true, message: '请选择监督检查部门' }]"
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
        v-model="shigongData.check_depart"
        name="监督检查部门"
        label="监督检查部门"
        placeholder="输入监督检查部门"
        :rules="[{ required: true, message: '请填写监督检查部门' }]"
      />
      <van-field
        v-model="shigongData.check_person"
        name="检察人员"
        label="检察人员"
        placeholder="检察人员"
        :rules="[{ required: true, message: '请填写检查人员' }]"
      />

      <van-cell-group>
        <van-field
          v-model="shigongData.check_content"
          label="检查内容"
          type="textarea"
          placeholder="检查内容"
          autosize
        />
      </van-cell-group>
      <h5>存在问题</h5>
      <van-field
        readonly
        clickable
        name="picker"
        :value="shigongData.check_question"
        label="存在问题"
        placeholder="点击选择存在问题"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
      <van-cell-group>
        <van-field
          v-model="shigongData.check_question_desp"
          type="textarea"
          placeholder="问题详情"
          autosize
        />
      </van-cell-group>
      <h5>整改情况</h5>
      <van-field name="radio">
        <template #input>
          <van-radio-group
            v-model="shigongData.change_state"
            direction="horizontal"
          >
            <van-radio name="限期">限期</van-radio>
            <van-radio name="当场">当场</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-cell-group>
        <van-field
          v-model="shigongData.change_desp"
          type="textarea"
          placeholder="整改详情"
          autosize
        />
      </van-cell-group>
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
          class="btn1"
          @click="buhege"
          round
          block
          type="info"
          native-type="submit"
        >
          不合格
        </van-button>
      </div>
      <div style="margin: 16px;">
        <van-button
          class="btn2"
          @click="hege"
          round
          block
          type="info"
          native-type="submit"
        >
          检查合格
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import axios from "axios";
//图片压缩文件
import { compressImage } from "../compressImage";
export default {
  data() {
    return {
      picture: [],
      jianchabumen: "",
      showPicker1: false,
      columns1: ["城管中队", "房屋管理办", "第三方监理", "其他"],
      shoudong: true,
      shoudong1: false,
      uploader: [],
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
        prj_state: "",
        check_depart: "",
        check_person: "",
        check_content: "",
        check_question: "",
        check_question_desp: "",
        change_state: "限期",
        change_desp: "",
        change_pictures: [],
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
        completion_date: "",
        prj_assist_org: "",
        prj_person_name: "",
        prj_person_phone: "",
        prj_type: "",
        start_date: ""
      },
      columns: [
        "未设置施工告示牌",
        "施工单位不具备相关资质",
        "现场不具备相应资质设计单位设计的施工图纸",
        "未按图施工",
        "擅自变动建筑主体和承重结构",
        "存在安全隐患",
        "正在搭建违法建筑",
        "其他"
      ],
      showPicker: false,

      gongchengData: {
        prj_name: ""
      },
      auth: {}
    };
  },
  created() {
    this.content();
  },
  methods: {
    //监察部门选择
    onConfirm1(value) {
      if (value == "其他") {
        this.shoudong = false;
        this.shoudong1 = true;
        this.showPicker1 = false;
      } else {
        this.shigongData.check_depart = value;
        this.showPicker1 = false;
      }
    },
    //图片格式校验
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
    onClickLeft() {
      this.$router.go(-1);
    },
    async content() {
      // const gongchengData = localStorage.getItem("gongchengData");
      // this.shouliData = JSON.parse(gongchengData);
      // this.gongchengData.prj_name = this.shouliData.prj_name;
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
        this.shigongData.userid = JSON.parse(userid);
      } else {
        this.shigongData.userid = this.$route.query.userid;

        sessionStorage.setItem("user_id", this.$route.query.userid);
      }
      this.gongchengData.prj_name = this.$route.query.prj_name;
      var { data: dt } = await this.$http.get("wx/getGongdi_info", {
        params: this.gongchengData
      });

      this.shigongData.prj_state = dt.prj_state;
      this.shigongData.prj_name = dt.prj_name;
      this.shigongData.prj_addr = dt.prj_addr;
      this.shigongData.prj_area = dt.prj_area;
      this.shigongData.prj_price = dt.prj_price;
      this.shigongData.demand_com = dt.demand_com;
      this.shigongData.construction_com = dt.construction_com;
      this.shigongData.supervison_com = dt.supervison_com;
      this.shigongData.design_rom = dt.design_rom;
      this.shigongData.fbi_name = dt.fbi_name;
      this.shigongData.fbi_phone = dt.fbi_phone;
      this.shigongData.contract_price = dt.contract_price;
      this.shigongData.prj_check = dt.prj_check;
      this.shigongData.completion_date = dt.completion_date;
      this.shigongData.prj_assist_org = dt.prj_assist_org;
      this.shigongData.prj_person_name = dt.prj_person_name;
      this.shigongData.prj_person_phone = dt.prj_person_phone;
      this.shigongData.prj_type = dt.prj_type;
      this.shigongData.start_date = dt.start_date;
      this.shigongData.completion_date = dt.completion_date;
      this.shigongData.completion_date = dt.completion_date;
      if (dt.prj_property) {
        this.shigongData.prj_property = dt.prj_property;
      }
      if (dt.prj_lease_contract) {
        this.shigongData.prj_lease_contract = dt.prj_lease_contract;
      }
      if (dt.prj_con_contract) {
        this.shigongData.prj_con_contract = dt.prj_con_contract;
      }
      if (dt.prj_license) {
        this.shigongData.prj_license = dt.prj_license;
      }
      if (dt.prj_certifications) {
        this.shigongData.prj_certifications = dt.prj_certifications;
      }
      if (dt.prj_manager_cert) {
        this.shigongData.prj_manager_cert = dt.prj_manager_cert;
      }
      if (dt.prj_safe_cert) {
        this.shigongData.prj_safe_cert = dt.prj_safe_cert;
      }
      if (dt.prj_manager_appiontment) {
        this.shigongData.prj_manager_appiontment = dt.prj_manager_appiontment;
      }
      if (dt.prj_safe_appiontment) {
        this.prj_safe_appiontment = dt.prj_safe_appiontment;
      }
      if (dt.prj_design_cert) {
        this.shigongData.prj_design_cert = dt.prj_design_cert;
      }
    },
    async hege() {
      //赋值给需要提交的属性
      this.shigongData.change_pictures = [];
      this.picture.forEach(e => {
        this.shigongData.change_pictures.push(e.UpName);
      });

      this.shigongData.change_pictures = this.shigongData.change_pictures.toString();
      this.shigongData.prj_state = "7";
      var { data: dt } = await this.$http.post(
        "wx/saveGongdi_info",
        this.shigongData
      );
      if (dt !== 0) {
        return this.$toast.fail({
          message: "提交失败"
        });
      }
      localStorage.setItem("shigongData", JSON.stringify(this.shigongData));
      this.$router.push({ name: "success5" });
    },
    async buhege() {
      //赋值给需要提交的属性
      this.shigongData.change_pictures = [];
      this.picture.forEach(e => {
        this.shigongData.change_pictures.push(e.UpName);
      });

      this.shigongData.change_pictures = this.shigongData.change_pictures.toString();
      this.shigongData.prj_state = "6";
      var { data: dt } = await this.$http.post(
        "wx/saveGongdi_info",
        this.shigongData
      );
      if (dt !== 0) {
        return this.$toast.fail({
          message: "提交失败"
        });
      }
      localStorage.setItem("shigongData", JSON.stringify(this.shigongData));
      this.$router.push({ name: "success5" });
    },
    //删除图片
    pictureDelete(file) {
      this.picture.forEach(e => {
        if (e.name === file.file.name) {
          this.picture.splice(e, 1);
        }
      });

      return true;
    },
    //压缩图片上传
    _compressAndUploadFile(file) {
      compressImage(file.content).then(result => {
        if (result.size > file.file.size) {
          //压缩后比原来更大，则将原图上传
          this._uploadFile(file.file, file.file.name, file);
        } else {
          //压缩后比原来小，上传压缩后的

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
          // `${this.$http.defaults.baseURL}:8085/gongdi/general/upload`,
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
    //获取图片信息
    afterRead(file) {
      // console.log(file.file);

      this._compressAndUploadFile(file);

      // param.append("file", file.file); // 通过append向form对象添加数据
    },
    tijiao() {},
    onSubmit() {},
    onConfirm(value) {
      this.shigongData.check_question = value;
      this.showPicker = false;
    }
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
h5 {
  color: #343434ff;
  font-size: 32px;
  font-weight: 400;
  padding: 30px;
  margin: 0;
}
.shangchuan {
  display: inline-block;
  vertical-align: middle;
  margin-top: 30px;
}
.touxiang {
  width: 128px;
  height: 108px;
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
</style>
