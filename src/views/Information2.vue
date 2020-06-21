<!--  -->
<template>
  <div>
    <van-nav-bar
      id="reset"
      title="小型工地施工文件照片上传"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="content">
      <van-row gutter="20">
        <van-col span="12">
          <div class="shangchuan">
            <van-uploader
              :after-read="afterRead"
              v-model="fileList"
              multiple
              :max-count="1"
            />
            <p>产权证</p>
          </div>
        </van-col>
        <van-col span="12">
          <div class="shangchuan">
            <van-uploader
              :after-read="afterRead1"
              v-model="fileList1"
              multiple
              :max-count="1"
            />
            <p>租赁合同</p>
          </div>
        </van-col>
      </van-row>
      <van-row gutter="20">
        <van-col span="12">
          <div class="shangchuan">
            <van-uploader
              :after-read="afterRead2"
              v-model="fileList2"
              multiple
              :max-count="1"
            />
            <p>施工合同</p>
          </div>
        </van-col>
        <van-col span="12">
          <div class="shangchuan">
            <van-uploader
              :after-read="afterRead3"
              v-model="fileList3"
              multiple
              :max-count="1"
            />
            <p>施工单位营业执照</p>
          </div>
        </van-col>
      </van-row>
      <van-row gutter="20">
        <van-col span="12">
          <div class="shangchuan">
            <van-uploader
              :after-read="afterRead4"
              v-model="fileList4"
              multiple
              :max-count="1"
            />
            <p>施工单位资质证书</p>
          </div>
        </van-col>
        <van-col span="12">
          <div class="shangchuan">
            <van-uploader
              :after-read="afterRead5"
              v-model="fileList5"
              multiple
              :max-count="1"
            />
            <p>项目经理证书</p>
          </div>
        </van-col>
      </van-row>
      <van-row gutter="20">
        <van-col span="12">
          <div class="shangchuan">
            <van-uploader
              :after-read="afterRead6"
              v-model="fileList6"
              multiple
              :max-count="1"
            />
            <p>安全员证书</p>
          </div>
        </van-col>
        <van-col span="12">
          <div class="shangchuan">
            <van-uploader
              :after-read="afterRead7"
              v-model="fileList7"
              multiple
              :max-count="1"
            />
            <p>项目经理任命文件</p>
          </div>
        </van-col>
      </van-row>
      <van-row gutter="20">
        <van-col span="12">
          <div class="shangchuan">
            <van-uploader
              :after-read="afterRead8"
              v-model="fileList8"
              multiple
              :max-count="1"
            />
            <p>安全员任命文件</p>
          </div>
        </van-col>
        <van-col span="12">
          <div class="shangchuan">
            <van-uploader
              :after-read="afterRead9"
              v-model="fileList9"
              multiple
              :max-count="1"
            />
            <p>设计单位资质文件</p>
          </div>
        </van-col>
      </van-row>
      <div style="margin: 16px;">
        <van-button
          @click="xiayibu"
          round
          block
          type="info"
          native-type="submit"
        >
          下一步
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      fileList: [],
      fileList1: [],
      fileList2: [],
      fileList3: [],
      fileList4: [],
      fileList5: [],
      fileList6: [],
      fileList7: [],
      fileList8: [],
      fileList9: [],
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
      shigongData: {}
    };
  },
  //方法集合
  methods: {
    xiayibu() {
      this.shigongData.prj_property = this.prj_property;
      this.shigongData.prj_lease_contract = this.prj_lease_contract;
      this.shigongData.prj_con_contract = this.prj_con_contract;
      this.shigongData.prj_license = this.prj_license;
      this.shigongData.prj_certifications = this.prj_certifications;
      this.shigongData.prj_manager_cert = this.prj_manager_cert;
      this.shigongData.prj_safe_cert = this.prj_safe_cert;
      this.shigongData.prj_manager_appiontment = this.prj_manager_appiontment;
      this.shigongData.prj_safe_appiontment = this.prj_safe_appiontment;
      this.shigongData.prj_design_cert = this.prj_design_cert;
      localStorage.setItem("shigongData", JSON.stringify(this.shigongData));
      this.$router.push({ name: "Synergy" });
    },
    RouterData() {
      const shigongData = localStorage.getItem("shigongData");
      this.shigongData = JSON.parse(shigongData);
      console.log(this.shigongData);
    },
    afterRead(file) {
      // console.log(file.file);

      let param = new FormData(); // 创建form对象
      //区分单文件上传还是多文件

      param.append("file", file.file); // 通过append向form对象添加数据

      // param.append("file", file.file); // 通过append向form对象添加数据
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      axios
        .post("http://111.229.190.8:8000/gongdi/general/upload", param, config)
        .then(response => {
          this.prj_property = response.data.data.result;
        });
    },
    afterRead1(file) {
      // console.log(file.file);

      let param = new FormData(); // 创建form对象
      //区分单文件上传还是多文件

      param.append("file", file.file); // 通过append向form对象添加数据

      // param.append("file", file.file); // 通过append向form对象添加数据
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      axios
        .post("http://111.229.190.8:8000/gongdi/general/upload", param, config)
        .then(response => {
          this.prj_lease_contract = response.data.data.result;
        });
    },
    afterRead2(file) {
      // console.log(file.file);

      let param = new FormData(); // 创建form对象

      param.append("file", file.file); // 通过append向form对象添加数据

      // param.append("file", file.file); // 通过append向form对象添加数据
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      axios
        .post("http://111.229.190.8:8000/gongdi/general/upload", param, config)
        .then(response => {
          this.prj_con_contract = response.data.data.result;
        });
    },
    afterRead3(file) {
      // console.log(file.file);

      let param = new FormData(); // 创建form对象
      //区分单文件上传还是多文件

      param.append("file", file.file); // 通过append向form对象添加数据

      // param.append("file", file.file); // 通过append向form对象添加数据
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      axios
        .post("http://111.229.190.8:8000/gongdi/general/upload", param, config)
        .then(response => {
          this.prj_license = response.data.data.result;
        });
    },
    afterRead4(file) {
      // console.log(file.file);

      let param = new FormData(); // 创建form对象
      //区分单文件上传还是多文件

      param.append("file", file.file); // 通过append向form对象添加数据

      // param.append("file", file.file); // 通过append向form对象添加数据
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      axios
        .post("http://111.229.190.8:8000/gongdi/general/upload", param, config)
        .then(response => {
          this.prj_certifications = response.data.data.result;
        });
    },
    afterRead5(file) {
      // console.log(file.file);

      let param = new FormData(); // 创建form对象
      //区分单文件上传还是多文件

      param.append("file", file.file); // 通过append向form对象添加数据

      // param.append("file", file.file); // 通过append向form对象添加数据
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      axios
        .post("http://111.229.190.8:8000/gongdi/general/upload", param, config)
        .then(response => {
          this.prj_manager_cert = response.data.data.result;
        });
    },
    afterRead6(file) {
      // console.log(file.file);

      let param = new FormData(); // 创建form对象
      //区分单文件上传还是多文件

      param.append("file", file.file); // 通过append向form对象添加数据

      // param.append("file", file.file); // 通过append向form对象添加数据
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      axios
        .post("http://111.229.190.8:8000/gongdi/general/upload", param, config)
        .then(response => {
          this.prj_safe_cert = response.data.data.result;
        });
    },
    afterRead7(file) {
      // console.log(file.file);

      let param = new FormData(); // 创建form对象
      //区分单文件上传还是多文件

      param.append("file", file.file); // 通过append向form对象添加数据

      // param.append("file", file.file); // 通过append向form对象添加数据
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      axios
        .post("http://111.229.190.8:8000/gongdi/general/upload", param, config)
        .then(response => {
          this.prj_manager_appiontment = response.data.data.result;
        });
    },
    afterRead8(file) {
      // console.log(file.file);

      let param = new FormData(); // 创建form对象
      //区分单文件上传还是多文件

      param.append("file", file.file); // 通过append向form对象添加数据

      // param.append("file", file.file); // 通过append向form对象添加数据
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      axios
        .post("http://111.229.190.8:8000/gongdi/general/upload", param, config)
        .then(response => {
          this.prj_safe_appiontment = response.data.data.result;
        });
    },
    afterRead9(file) {
      // console.log(file.file);

      let param = new FormData(); // 创建form对象
      //区分单文件上传还是多文件

      param.append("file", file.file); // 通过append向form对象添加数据

      // param.append("file", file.file); // 通过append向form对象添加数据
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      axios
        .post("http://111.229.190.8:8000/gongdi/general/upload", param, config)
        .then(response => {
          this.prj_design_cert = response.data.data.result;
        });
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  },
  created() {
    this.RouterData();
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
.content {
  padding: 30px;
}
.shangchuan {
  text-align: center;
  p {
    text-align: center;
    color: #343434ff;
    font-size: 19px;
  }
}
.van-row {
  margin-top: 20px;
}
</style>
