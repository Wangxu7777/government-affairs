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
      xiaoxirenyuan: "",
      radio: "",
      shigongData: {},
      list: [
        "社区平安办",
        "城管中队",
        "街道社区管理办",
        "灯光景观所",
        "第三方机构"
      ],
      result: [],
      fasongData: {
        // touser: "13413156908",
        touser: "",

        // toparty: "6899",
        msgtype: "news",
        agentid: this.$store.state.agentid,
        // image: { medis_id: "http://47.104.29.235:8080/flower.jpeg" }
        news: {
          articles: [
            {
              title: "政务微信流程测试",
              description: "政务微信流程",
              url: "",
              picurl: `${
                this.$store.state.xiaoxitu
              }${require("../assets/img/fasongxinxitu.png")}`
            }
          ]
        }
      }
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
    //发送信息
    async fasong() {
      // this.fasongData.touser = "13671711858";
      this.fasongData.touser = this.xiaoxirenyuan;
      this.fasongData.news.articles[0].title = `已受理小型工程，待审核`;

      this.fasongData.news.articles[0].url = `${this.$store.state.articlesUrl}${this.$store.state.qingqiuUrl}/details1?prj_name=${this.shigongData.prj_name}&du_msg=1`;
      this.fasongData.news.articles[0].description = this.shigongData.prj_name;
      var { data: dt } = await this.$http.post("sendMsg", this.fasongData);
      if (dt.retcode == "-1") {
        return this.$toast.fail({
          message: "发送信息失败"
        });
      }

      if (dt.data.errcode != 0) {
        return this.$toast.fail({
          message: "发送信息失败"
        });
      }

      // localStorage.setItem("shigongData", JSON.stringify(this.shigongData));
      this.$router.push({
        name: "success1",
        query: {
          prj_name: this.shigongData.prj_name
        }
      });
    },
    async tijiao() {
      const user_id = sessionStorage.getItem("user_id");
      this.shigongData.userid = JSON.parse(user_id);
      this.shigongData.prj_state = "-22";
      this.shigongData.prj_assist_org = this.result.toString();
      var { data: dt } = await this.$http.post(
        "wx/saveGongdi_info",
        this.shigongData
      );
      if (dt.retcode == "-2") {
        return this.$toast.fail({
          message: "项目已被处理"
        });
      }
      if (dt !== 0) {
        return this.$toast.fail({
          message: "提交失败"
        });
      }

      this.fasong();
    },
    RouterData() {
      const shigongData = localStorage.getItem("shigongData");
      this.shigongData = JSON.parse(shigongData);
    },
    //发送消息人员查询
    async fasongUser() {
      let step = { step: "工程受理审核" };
      const { data: dt } = await this.$http.get(
        "user/query_msgUserByUserStep",
        { params: step }
      );
      if (dt.retcode != "0") {
        return this.$toast.fail({
          message: "获取发送消息人员失败"
        });
      }

      this.xiaoxirenyuan = dt.data
        .map(obj => {
          return obj.userid;
        })
        .join("|");
    }
  },
  created() {
    this.RouterData();
    this.fasongUser();
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
