<!--  -->
<template>
  <div>
    <van-nav-bar
      id="reset"
      title="添加协同人员"
      left-arrow
      @click-left="onClickLeft"
    />
    <p>小型工地施工信息单位</p>
    <!-- <van-radio-group v-model="radio">
      <van-cell-group>
        <van-cell title="社区平安办" clickable @click="radio = '社区平安办'">
          <template #right-icon>
            <van-radio name="社区平安办" />
          </template>
        </van-cell>
        <van-cell title="城管中队" clickable @click="radio = '城管中队'">
          <template #right-icon>
            <van-radio name="城管中队" />
          </template>
        </van-cell>
        <van-cell
          title="街道社区管理办"
          clickable
          @click="radio = '街道社区管理办'"
        >
          <template #right-icon>
            <van-radio name="街道社区管理办" />
          </template>
        </van-cell>
        <van-cell title="灯光景观所" clickable @click="radio = '灯光景观所'">
          <template #right-icon>
            <van-radio name="灯光景观所" />
          </template>
        </van-cell>
        <van-cell title="第三方机构" clickable @click="radio = '第三方机构'">
          <template #right-icon>
            <van-radio name="第三方机构" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group> -->
    <van-checkbox-group v-model="result">
      <van-cell-group>
        <van-cell
          v-for="(item, index) in list"
          clickable
          :key="item"
          :title="`${item}`"
          @click="toggle(index)"
        >
          <template #right-icon>
            <van-checkbox :name="item" ref="checkboxes" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-checkbox-group>
    <div style="margin: 16px;">
      <van-button @click="tijiao" round block type="info" native-type="submit">
        提交
      </van-button>
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
      radio: "社区平安办",
      shigongData: {},
      list: [
        "社区平安办",
        "城管中队",
        "街道社区管理办",
        "灯光景观所",
        "第三方机构"
      ],
      result: []
    };
  },
  //方法集合
  methods: {
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    async tijiao() {
      this.shigongData.prj_state = "-2";
      this.shigongData.prj_assist_org = this.result.toString();
      var { data: dt } = await this.$http.post(
        "wx/saveGongdi_info",
        this.shigongData
      );
      if (dt != 0) {
        return this.$toast.fail({
          message: "提交失败"
        });
      }
      localStorage.setItem("shigongData", JSON.stringify(this.shigongData));
      this.$router.push({ name: "success1" });
    },
    RouterData() {
      const shigongData = localStorage.getItem("shigongData");
      this.shigongData = JSON.parse(shigongData);
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
p {
  color: #343434ff;
  font-size: 24px;
  padding: 30px;
  background-color: #f0f0f0ff;
}
</style>
