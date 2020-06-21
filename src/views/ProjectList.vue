<template>
  <div>
    <van-nav-bar id="reset" title="工程列表" left-arrow />

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
                <van-cell title="已受理" clickable @click="radio = '1'">
                  <template #right-icon>
                    <van-radio name="1" />
                  </template>
                </van-cell>
                <van-cell title="检查合格" clickable @click="radio = '2'">
                  <template #right-icon>
                    <van-radio name="2" />
                  </template>
                </van-cell>
                <van-cell title="检查未合格" clickable @click="radio = '3'">
                  <template #right-icon>
                    <van-radio name="3" />
                  </template>
                </van-cell>
                <van-cell title="已竣工" clickable @click="radio = '4'">
                  <template #right-icon>
                    <van-radio name="4" />
                  </template>
                </van-cell>
                <van-cell
                  title="非小型工程，已移交"
                  clickable
                  @click="radio = '5'"
                >
                  <template #right-icon>
                    <van-radio name="5" />
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
      <van-cell v-for="item in list" :key="item" :title="item" label="描述信息">
        <div class="neirong3">
          <p>2018年9月</p>
          <p>已受理</p>
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
      loading: false,
      finished: false
    };
  },
  methods: {
    onConfirm() {},
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
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
