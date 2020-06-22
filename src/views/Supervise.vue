<template>
  <div>
    <van-nav-bar id="reset" title="小型建设工程监督检查记录单" />
    <p>工程基本信息</p>
    <van-cell-group>
      <van-field label="工程名称" value="输入框只读" readonly />
      <van-field label="工程地址" value="输入框只读" readonly />
      <van-field label="建设单位" value="输入框只读" readonly />
      <van-field label="施工单位" value="输入框只读" readonly />
      <van-field label="监理单位" value="输入框只读" readonly />
      <van-field label="设计单位" value="输入框只读" readonly />
      <van-field label="联系人姓名" value="输入框只读" readonly />
      <van-field label="联系人电话" value="输入框只读" readonly />
      <van-field label="工程面积" value="输入框只读" readonly />
      <van-field label="合同造价" value="输入框只读" readonly />
      <van-field label="基本违法,违规情况" value="输入框只读" readonly />
    </van-cell-group>
    <p>监督检查记录</p>
    <van-form validate-first @submit="onSubmit">
      <van-field
        v-model="shigongData.prj_name"
        name="监督检查部门"
        label="监督检查部门"
        placeholder="监督检查部门"
        :rules="[{ required: true, message: '请填写监督检查部门' }]"
      />
      <van-field
        v-model="shigongData.prj_addr"
        name="检察人员"
        label="检察人员"
        placeholder="检察人员"
        :rules="[{ required: true, message: 'xxx号xxx路' }]"
      />
      <van-field
        v-model="shigongData.demand_com"
        name="建设单位"
        label="建设单位"
        placeholder="建设单位"
      />

      <van-cell-group>
        <van-field
          v-model="shigongData.prj_addr"
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
        :value="value"
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
          v-model="shigongData.prj_addr"
          type="textarea"
          placeholder="问题详情"
          autosize
        />
      </van-cell-group>
      <h5>整改情况</h5>
      <van-field name="radio">
        <template #input>
          <van-radio-group v-model="radio" direction="horizontal">
            <van-radio name="限期">限期</van-radio>
            <van-radio name="当场">当场</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-cell-group>
        <van-field
          v-model="shigongData.prj_addr"
          type="textarea"
          placeholder="整改详情"
          autosize
        />
      </van-cell-group>
      <div class="shangchuan_box">
        <van-field name="uploader" label="照片上传" class="shangchuan">
          <template #input>
            <van-uploader
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
export default {
  data() {
    return {
      uploader: [],
      shigongData: {
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
        prj_person_phone: ""
      },
      value: "",
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
      radio: "限期"
    };
  },
  methods: {
    hege() {
      this.$router.push({ name: "success5" });
    },
    buhege() {
      this.$router.push({ name: "success5" });
    },
    afterRead(file) {
      // console.log(file.file);

      let param = new FormData(); // 创建form对象
      //区分单文件上传还是多文件
      if (file instanceof Array && file.length) {
        for (let i = 0; i < file.length; i++) {
          param.append("files", file[i].file);
        }
      } else {
        param.append("file", file.file); // 通过append向form对象添加数据
      }
      // param.append("file", file.file); // 通过append向form对象添加数据
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      axios
        .post("http://111.229.190.8:8000/gongdi/general/upload", param, config)
        .then(response => {
          this.postData.push(response.data.data.result); //上传一张之后压入这个数组

          console.log(this.postData);
          this.gongchengData.picture = response.data.data.result;

          // console.log(this.gongchengData);
        });
    },
    tijiao() {},
    onSubmit() {},
    onConfirm(value) {
      this.value = value;
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
