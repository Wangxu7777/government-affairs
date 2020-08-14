<!--  -->
<template>
  <div>
    <van-nav-bar
      id="reset"
      title="小型工地施工信息单"
      left-arrow
      @click-left="onClickLeft"
    />
    <p>工程施工信息</p>
    <van-form validate-first @submit="onSubmit">
      <van-field
        v-model="shigongData.prj_name"
        name="工程名称"
        label="工程名称"
        placeholder="工程名称"
        readonly
        :rules="[{ required: true, message: '请填写工程名称' }]"
      />
      <van-field
        v-model="shigongData.prj_addr"
        name="建设地址"
        label="建设地址"
        placeholder="建设地址"
        :rules="[{ required: true, message: '请填写建设地址' }]"
      />
      <van-field
        v-model="shigongData.prj_type"
        name="工程类型"
        label="工程类型"
        placeholder="工程类型"
        :rules="[{ required: true, message: '请填写工程类型' }]"
      />

      <van-field
        v-model="shigongData.prj_area"
        name="工程面积"
        label="工程面积"
        placeholder="工程面积"
        :rules="[{ required: true, message: '请填写工程面积' }]"
      />
      <van-field
        v-model="shigongData.prj_price"
        name="合同造价"
        label="合同造价"
        placeholder="合同造价"
        :rules="[{ required: true, message: '请填写合同造价' }]"
      />
      <van-field
        v-model="shigongData.demand_com"
        name="建设单位"
        label="建设单位"
        placeholder="建设单位"
      />
      <van-field
        v-model="shigongData.construction_com"
        name="施工单位"
        label="施工单位"
        placeholder="施工单位"
      />
      <van-field
        v-model="shigongData.supervison_com"
        name="监理单位"
        label="监理单位"
        placeholder="监理单位"
      />
      <van-field
        v-model="shigongData.design_rom"
        name="设计单位"
        label="设计单位"
        placeholder="设计单位"
      />
      <van-field
        readonly
        clickable
        name="calendar"
        :value="shigongData.start_date"
        label="开工日期"
        placeholder="点击选择日期"
        @click="showCalendar = true"
      />
      <van-calendar
        :min-date="minDate"
        v-model="showCalendar"
        @confirm="onConfirm"
      />
      <van-field
        readonly
        clickable
        name="calendar"
        :value="shigongData.completion_date"
        label="竣工日期"
        placeholder="点击选择日期"
        @click="showCalendar1 = true"
      />
      <van-calendar v-model="showCalendar1" @confirm="onConfirm1" />
      <p>监督单位信息</p>
      <van-field
        v-model="shigongData.fbi_name"
        name="名称"
        label="名称"
        placeholder="名称"
      />
      <van-field
        v-model="shigongData.fbi_phone"
        name="监督电话"
        label="监督电话"
        placeholder="监督电话"
      />
      <p>项目负责任人信息</p>
      <van-field
        v-model="shigongData.prj_person_name"
        name="姓名"
        label="姓名"
        placeholder="姓名"
      />
      <van-field
        v-model="shigongData.prj_person_phone"
        name="负责人电话"
        label="负责人电话"
        placeholder="负责人电话"
      />
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
    </van-form>
  </div>
</template>

<script>
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      maxDate: new Date(2010, 0, 31),
      minDate: new Date(2010, 0, 1),
      userid: "",
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

      showCalendar: false,
      showCalendar1: false,
      gongchengData: {
        prj_name: ""
      }
    };
  },
  //方法集合
  methods: {
    async content() {
      const userid = sessionStorage.getItem("user_id");

      if (userid) {
        this.userid = userid;
      } else {
        this.userid = this.$route.query.userid;

        sessionStorage.setItem(
          "user_id",
          JSON.stringify(this.$route.query.userid)
        );
      }
      this.gongchengData.prj_name = this.$route.query.prj_name;
      var { data: dt } = await this.$http.get("wx/getGongdi", {
        params: this.gongchengData
      });
      this.shigongData.prj_name = dt.prj_name;
      this.shigongData.prj_addr = dt.prj_addr;
      this.shigongData.prj_type = dt.prj_type;
    },
    onSubmit() {
      localStorage.setItem("shigongData", JSON.stringify(this.shigongData));
      this.$router.push({ name: "Information2" });
    },
    xiayibu() {},
    onClickLeft() {
      this.$router.go(-1);
    },
    onConfirm(date) {
      this.shigongData.start_date = `${date.getFullYear()}/${date.getMonth() +
        1}/${date.getDate()}`;
      this.showCalendar = false;
    },
    onConfirm1(date) {
      this.shigongData.completion_date = `${date.getFullYear()}/${date.getMonth() +
        1}/${date.getDate()}`;
      this.showCalendar1 = false;
    }
  },
  created() {
    this.content();
  },
  beforeCreate() {
    document
      .querySelector("body")
      .setAttribute("style", "background-color:#F0F0F0FF");
  },

  beforeDestroy() {
    document.querySelector("body").removeAttribute("style");
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
</style>
