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
              :before-read="beforeRead"
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
              :before-read="beforeRead"
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
              :before-read="beforeRead"
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
              :before-read="beforeRead"
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
              :before-read="beforeRead"
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
              :before-read="beforeRead"
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
              :before-read="beforeRead"
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
              :before-read="beforeRead"
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
              :before-read="beforeRead"
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
//图片压缩文件
import { compressImage } from "../compressImage";
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
      // console.log(this.shigongData);
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
          this.prj_property = response.data.data.result;
        });
    },
    afterRead(file) {
      // console.log(file.file);

      this._compressAndUploadFile(file);
    },
    //压缩图片上传
    _compressAndUploadFile1(file) {
      compressImage(file.content).then(result => {
        if (result.size > file.file.size) {
          //压缩后比原来更大，则将原图上传
          this._uploadFile1(file.file, file.file.name, file);
        } else {
          //压缩后比原来小，上传压缩后的

          this._uploadFile1(result, file.file.name, file);
        }
      });
    },

    //上传图片
    _uploadFile1(file, filename, files) {
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
          this.prj_lease_contract = response.data.data.result;
        });
    },
    afterRead1(file) {
      // console.log(file.file);

      this._compressAndUploadFile1(file);
    },
    //压缩图片上传
    _compressAndUploadFile2(file) {
      compressImage(file.content).then(result => {
        if (result.size > file.file.size) {
          //压缩后比原来更大，则将原图上传
          this._uploadFile2(file.file, file.file.name, file);
        } else {
          //压缩后比原来小，上传压缩后的

          this._uploadFile2(result, file.file.name, file);
        }
      });
    },

    //上传图片
    _uploadFile2(file, filename, files) {
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
          this.prj_con_contract = response.data.data.result;
        });
    },
    afterRead2(file) {
      // console.log(file.file);

      this._compressAndUploadFile2(file);
    },
    //压缩图片上传
    _compressAndUploadFile3(file) {
      compressImage(file.content).then(result => {
        if (result.size > file.file.size) {
          //压缩后比原来更大，则将原图上传
          this._uploadFile3(file.file, file.file.name, file);
        } else {
          //压缩后比原来小，上传压缩后的

          this._uploadFile3(result, file.file.name, file);
        }
      });
    },

    //上传图片
    _uploadFile3(file, filename, files) {
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
          this.prj_license = response.data.data.result;
        });
    },
    afterRead3(file) {
      // console.log(file.file);

      this._compressAndUploadFile3(file);
    },
    //压缩图片上传
    _compressAndUploadFile4(file) {
      compressImage(file.content).then(result => {
        if (result.size > file.file.size) {
          //压缩后比原来更大，则将原图上传
          this._uploadFile4(file.file, file.file.name, file);
        } else {
          //压缩后比原来小，上传压缩后的

          this._uploadFile4(result, file.file.name, file);
        }
      });
    },

    //上传图片
    _uploadFile4(file, filename, files) {
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
          this.prj_certifications = response.data.data.result;
        });
    },
    afterRead4(file) {
      // console.log(file.file);

      this._compressAndUploadFile4(file);
    },
    //压缩图片上传
    _compressAndUploadFile5(file) {
      compressImage(file.content).then(result => {
        if (result.size > file.file.size) {
          //压缩后比原来更大，则将原图上传
          this._uploadFile5(file.file, file.file.name, file);
        } else {
          //压缩后比原来小，上传压缩后的

          this._uploadFile5(result, file.file.name, file);
        }
      });
    },

    //上传图片
    _uploadFile5(file, filename, files) {
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
          this.prj_manager_cert = response.data.data.result;
        });
    },
    afterRead5(file) {
      this._compressAndUploadFile5(file);
    },
    //压缩图片上传
    _compressAndUploadFile6(file) {
      compressImage(file.content).then(result => {
        if (result.size > file.file.size) {
          //压缩后比原来更大，则将原图上传
          this._uploadFile6(file.file, file.file.name, file);
        } else {
          //压缩后比原来小，上传压缩后的

          this._uploadFile6(result, file.file.name, file);
        }
      });
    },

    //上传图片
    _uploadFile6(file, filename, files) {
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
          this.prj_safe_cert = response.data.data.result;
        });
    },
    afterRead6(file) {
      // console.log(file.file);

      this._compressAndUploadFile6(file);
    },
    //压缩图片上传
    _compressAndUploadFile7(file) {
      compressImage(file.content).then(result => {
        if (result.size > file.file.size) {
          //压缩后比原来更大，则将原图上传
          this._uploadFile7(file.file, file.file.name, file);
        } else {
          //压缩后比原来小，上传压缩后的

          this._uploadFile7(result, file.file.name, file);
        }
      });
    },

    //上传图片
    _uploadFile7(file, filename, files) {
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
          this.prj_manager_appiontment = response.data.data.result;
        });
    },
    afterRead7(file) {
      // console.log(file.file);

      this._compressAndUploadFile7(file);
    },
    //压缩图片上传
    _compressAndUploadFile8(file) {
      compressImage(file.content).then(result => {
        if (result.size > file.file.size) {
          //压缩后比原来更大，则将原图上传
          this._uploadFile8(file.file, file.file.name, file);
        } else {
          //压缩后比原来小，上传压缩后的

          this._uploadFile8(result, file.file.name, file);
        }
      });
    },

    //上传图片
    _uploadFile8(file, filename, files) {
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
          this.prj_safe_appiontment = response.data.data.result;
        });
    },
    afterRead8(file) {
      // console.log(file.file);

      this._compressAndUploadFile8(file);
    },
    //压缩图片上传
    _compressAndUploadFile9(file) {
      compressImage(file.content).then(result => {
        if (result.size > file.file.size) {
          //压缩后比原来更大，则将原图上传
          this._uploadFile9(file.file, file.file.name, file);
        } else {
          //压缩后比原来小，上传压缩后的

          this._uploadFile9(result, file.file.name, file);
        }
      });
    },

    //上传图片
    _uploadFile9(file, filename, files) {
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
          this.prj_design_cert = response.data.data.result;
        });
    },
    afterRead9(file) {
      // console.log(file.file);

      this._compressAndUploadFile9(file);
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
