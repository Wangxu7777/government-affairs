<!--  -->
<template>
  <div>
    <van-nav-bar id="reset" title="小型工地施工信息单" left-arrow />
    <p>工程施工信息</p>
    <van-form>
      <van-field
        v-model="gongchengming"
        name="工程名称"
        label="工程名称"
        placeholder="工程名称"
        :rules="[{ required: true, message: '请填写工程名称' }]"
      />
      <van-field
        v-model="jianshedi"
        name="建设地址"
        label="建设地址"
        placeholder="建设地址"
        :rules="[{ required: true, message: '请填写建设地址' }]"
      />
      <van-field
        v-model="jianshedanwei"
        name="建设单位"
        label="建设单位"
        placeholder="建设单位"
        :rules="[{ required: true, message: '请填写建设单位' }]"
      />
      <van-field
        v-model="gongchengleixing"
        name="工程类型"
        label="工程类型"
        placeholder="工程类型"
        :rules="[{ required: true, message: '请填写工程类型' }]"
      />

      <van-field
        v-model="gongchengmianji"
        name="工程面积"
        label="工程面积"
        placeholder="工程面积"
        :rules="[{ required: true, message: '请填写工程面积' }]"
      />
      <van-field
        v-model="hetongzaojia"
        name="合同造价"
        label="合同造价"
        placeholder="合同造价"
        :rules="[{ required: true, message: '请填写合同造价' }]"
      />
      <van-field
        v-model="shigongdanwei"
        name="施工单位"
        label="施工单位"
        placeholder="施工单位"
      />
      <van-field
        v-model="jianlidanwei"
        name="监理单位"
        label="监理单位"
        placeholder="监理单位"
      />
      <van-field
        v-model="shejidanwei"
        name="设计单位"
        label="设计单位"
        placeholder="设计单位"
      />
      <van-field
        readonly
        clickable
        name="calendar"
        :value="kaigongriqi"
        label="开工日期"
        placeholder="点击选择日期"
        @click="showCalendar = true"
      />
      <van-calendar v-model="showCalendar" @confirm="onConfirm" />
      <van-field
        readonly
        clickable
        name="calendar"
        :value="jungongriqi"
        label="开工日期"
        placeholder="点击选择日期"
        @click="showCalendar1 = true"
      />
      <van-calendar v-model="showCalendar1" @confirm="onConfirm1" />
      <p>监督单位信息</p>
      <van-field
        v-model="jianduming"
        name="名称"
        label="名称"
        placeholder="名称"
        :rules="[{ required: true, message: '请填写名称' }]"
      />
      <van-field
        v-model="jiandudianhua"
        name="监督电话"
        label="监督电话"
        placeholder="监督电话"
        :rules="[{ required: true, message: '请填写监督电话' }]"
      />
      <p>项目负责任人信息</p>
      <van-field
        v-model="fuzerenming"
        name="姓名"
        label="姓名"
        placeholder="姓名"
        :rules="[{ required: true, message: '请填写姓名' }]"
      />
      <van-field
        v-model="fuzerenshejidanwei"
        name="设计单位"
        label="设计单位"
        placeholder="设计单位"
        :rules="[{ required: true, message: '请填写设计单位' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
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
      gongchengming: "",
      jianshedi: "",
      jianshedanwei: "",
      gongchengleixing: "",
      gongchengmianji: "",
      hetongzaojia: "",
      shigongdanwei: "",
      jianlidanwei: "",
      shejidanwei: "",
      kaigongriqi: "",
      jungongriqi: "",
      showCalendar: false,
      showCalendar1: false,
      jianduming: "",
      jiandudianhua: "",
      fuzerenming: "",
      fuzerenshejidanwei: ""
    };
  },
  //方法集合
  methods: {
    onConfirm(date) {
      this.kaigongriqi = `${date.getMonth() + 1}/${date.getDate()}`;
      this.showCalendar = false;
    },
    onConfirm1(date) {
      this.jungongriqi = `${date.getMonth() + 1}/${date.getDate()}`;
      this.showCalendar1 = false;
    }
  },
  created() {},
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
