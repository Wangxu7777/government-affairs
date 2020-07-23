<template>
  <div>
    <van-nav-bar
      id="reset"
      title="竣工列表"
      left-arrow
      @click-left="onClickLeft"
    />

    <van-search
      v-model="value"
      show-action
      placeholder="请输入搜索关键词"
      shape="round"
    >
    </van-search>
    <!-- <div class="neirong">
        <p></p>
    </div> -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        @click="see"
        v-for="(item, index) in this.list"
        :key="index"
        :title="item.data.prj_name"
        :label="item.data.prj_addr"
      >
        <div class="neirong3">
          <p>{{ item.data.updateTime }}</p>
          <p>{{ item.data.prj_state }}</p>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list2: [
        "已受理，待审核",
        "正在移交",
        "受理审核通过",
        "督察不合格",
        "已督察",
        "已竣工"
      ],
      result: [],
      value: "",
      radio: "",
      list: [],
      list1: [],
      loading: false,
      finished: false,
      timeout: null,
      sousuoData: {
        prj_name: ""
      },
      shaixuanData: {
        prj_state: []
      }
    };
  },
  watch: {
    value(curVal) {
      // this.loading = true;
      // 实现input连续输入，只发一次请求
      if (curVal == "") {
        return this.onLoad();
      }
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.sousuoList(curVal);
      }, 1000);
    },
    // radio(curVal) {
    //   this.shaixuan(curVal);
    // },
    result(curVal) {
      this.shaixuan(curVal);
    }
  },
  methods: {
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    see(e) {
      var w = e.currentTarget.innerText;
      var a = w.trim().split("\n");
      this.$router.push({
        path: "/testResult",
        query: {
          prj_name: a[0]
        }
      });
    },
    async sousuoList(curVal) {
      this.sousuoData.prj_name = curVal;
      var { data: dt } = await this.$http.get("wx/getGongdi_info_ByName", {
        params: this.sousuoData
      });
      this.list = dt;
      this.list = this.list.filter(function(arr) {
        return arr.data.prj_state == "6" || arr.data.prj_state == "7";
      });
      this.list.forEach(e => {
        if (e.data.prj_state == "6") {
          e.data.prj_state = "已督察";
        }
        if (e.data.prj_state == "7") {
          e.data.prj_state = "已督察";
        }
        let str = e.data.updateTime.split(" ");
        e.data.updateTime = str[0];
      });
    },
    onConfirm() {},
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      var { data: dt } = await this.$http.get(
        "wx/getGongdi_info_AllBySortDate"
      );

      this.list = dt;
      this.list = this.list.filter(function(arr) {
        return arr.data.prj_state == "6" || arr.data.prj_state == "7";
      });

      this.list.forEach(e => {
        if (e.data.prj_state == "6") {
          e.data.prj_state = "已督察";
        }
        if (e.data.prj_state == "7") {
          e.data.prj_state = "已督察";
        }
        let str = e.data.updateTime.split(" ");
        e.data.updateTime = str[0];
      });

      // 加载状态结束
      this.loading = false;
      this.finished = true;
    }
  },
  created() {
    // this.content();
    localStorage.removeItem("gongchengData");
    localStorage.removeItem("shigongData");
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
#quchu /deep/ .van-dropdown-menu__bar {
  box-shadow: 0 0 0 0 !important;
}
.neirong {
  padding: 30px;
}
.neirong2 {
  width: 100%;
  height: 50%;
  background: pink;
}
.neirong2 {
  width: 100%;
  height: 50%;
  background: blue;
}
.neirong3 {
  width: 100%;
  height: 100%;
}
</style>
