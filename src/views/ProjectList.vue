<template>
  <div>
    <van-nav-bar
      id="reset"
      title="工程列表"
      left-arrow
      @click-left="onClickLeft"
    />

    <van-search
      v-model="value"
      show-action
      placeholder="请输入搜索关键词"
      shape="round"
    >
      <template #action>
        <van-dropdown-menu id="quchu">
          <van-dropdown-item title="" ref="item">
            <template #title>
              <icon-svg class="touxiang" icon-class="shaixuantiaojian" />
            </template>
            <van-radio-group v-model="radio">
              <van-cell-group>
                <van-cell title="已受理" clickable @click="radio = '已受理'">
                  <template #right-icon>
                    <van-radio name="已受理" />
                  </template>
                </van-cell>
                <van-cell title="检查合格" clickable @click="radio = '已督察'">
                  <template #right-icon>
                    <van-radio name="已督察" />
                  </template>
                </van-cell>
                <van-cell
                  title="检查未合格"
                  clickable
                  @click="radio = '督察不合格'"
                >
                  <template #right-icon>
                    <van-radio name="督察不合格" />
                  </template>
                </van-cell>
                <van-cell title="已竣工" clickable @click="radio = '已竣工'">
                  <template #right-icon>
                    <van-radio name="已竣工" />
                  </template>
                </van-cell>
                <van-cell
                  title="非小型工程，已移交"
                  clickable
                  @click="radio = '非小型工程 已移送'"
                >
                  <template #right-icon>
                    <van-radio name="非小型工程 已移送" />
                  </template>
                </van-cell>
              </van-cell-group>
            </van-radio-group>
          </van-dropdown-item>
        </van-dropdown-menu>
        <!-- <div @click="onSearch">
          <icon-svg class="touxiang" icon-class="shaixuantiaojian" />
        </div> -->
      </template>
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
          <p>{{ item.data.start_date }}</p>
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
      value: "",
      radio: "",
      list: [],
      list1: [],
      loading: false,
      finished: false,
      timeout: null,
      sousuoData: {
        prj_name: ""
      }
    };
  },
  watch: {
    value(curVal) {
      // this.loading = true;
      // 实现input连续输入，只发一次请求
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.sousuoList(curVal);
      }, 1000);
    },
    radio(curVal) {
      this.shaixuan(curVal);
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    see(e) {
      var w = e.currentTarget.innerText;
      var a = w.trim().split("\n");
      this.$router.push({
        path: "/details",
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
      this.list.forEach(e => {
        if (e.data.prj_state == "-2") {
          e.data.prj_state = "已受理，待审核";
        }
        if (e.data.prj_state == "-1") {
          e.data.prj_state = "未受理";
        }
        if (e.data.prj_state == "0") {
          e.data.prj_state = "已受理";
        }
        if (e.data.prj_state == "1") {
          e.data.prj_state = "非小型工程 已移送";
        }
        if (e.data.prj_state == "2") {
          e.data.prj_state = "不同意移交";
        }
        if (e.data.prj_state == "3") {
          e.data.prj_state = "同意移交";
        }
        if (e.data.prj_state == "4") {
          e.data.prj_state = "不同意接收";
        }
        if (e.data.prj_state == "5") {
          e.data.prj_state = "同意接收";
        }
        if (e.data.prj_state == "6") {
          e.data.prj_state = "督察不合格";
        }
        if (e.data.prj_state == "7") {
          e.data.prj_state = "已督察";
        }
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
      this.list.forEach(e => {
        if (e.data.prj_state == "-2") {
          e.data.prj_state = "已受理，待审核";
        }
        if (e.data.prj_state == "-1") {
          e.data.prj_state = "未受理";
        }
        if (e.data.prj_state == "0") {
          e.data.prj_state = "已受理";
        }
        if (e.data.prj_state == "1") {
          e.data.prj_state = "非小型工程，已移送";
        }
        if (e.data.prj_state == "2") {
          e.data.prj_state = "不同意移交";
        }
        if (e.data.prj_state == "3") {
          e.data.prj_state = "同意移交";
        }
        if (e.data.prj_state == "4") {
          e.data.prj_state = "不同意接收";
        }
        if (e.data.prj_state == "5") {
          e.data.prj_state = "同意接收";
        }
        if (e.data.prj_state == "6") {
          e.data.prj_state = "督察不合格";
        }
        if (e.data.prj_state == "7") {
          e.data.prj_state = "已督察";
        }
      });
      this.list1 = this.list;
      // 加载状态结束
      this.loading = false;
      this.finished = true;
    },
    shaixuan(prj_state) {
      this.list = this.list1;
      if (this.finished == true) {
        this.list = this.list.filter(item => item.data.prj_state == prj_state);
      }
    }
  },
  created() {
    // this.content();
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
