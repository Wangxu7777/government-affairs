<!--  -->
<template>
  <div>
    <van-nav-bar id="reset" title="我的" left-arrow @click-left="onClickLeft" />
    <div class="user">
      <van-row type="flex" align="center">
        <van-col class="icn">
          <van-image
            fit="cover"
            round
            width="3.5rem"
            height="3.6rem"
            :src="headUrl"
          />
          <!-- <van-icon class="header" name="manager" /> -->
        </van-col>
        <van-col class="name">
          <p class="name1">{{ userData.name }}</p>
          <p class="name2">{{ departmentName }}</p>
        </van-col>
        <!-- <van-col offset="12">
          <van-icon class="xiaoxi" name="envelop-o" />
        </van-col> -->
      </van-row>
    </div>
    <p class="title"><van-icon name="underway-o" /> 历史足迹</p>
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
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      loading: false,
      list: [],
      finished: false,
      user: {
        user_id: ""
      },
      userData: {},
      departmentId: {
        depart_id: ""
      },
      departmentName: "",
      auth: {},
      headUrl: ""
    };
  },
  //方法集合
  methods: {
    async department(id) {
      this.departmentId.depart_id = id;
      const { data: dt } = await this.$http.get("getDepartName", {
        params: this.departmentId
      });
      if (dt.retcode !== "0") {
        return this.$toast.fail({
          message: "部门名称查询失败"
        });
      }
      this.departmentName = dt.data.department[0].name;
    },
    async content() {
      //获取用户权限状态
      const auth = sessionStorage.getItem("auth");

      if (auth) {
        this.auth = JSON.parse(auth);
      } else {
        if (this.$route.query.auth) {
          this.auth = JSON.parse(this.$route.query.auth);
          sessionStorage.setItem("auth", this.$route.query.auth);
        }
      }
      const userid = sessionStorage.getItem("user_id");

      if (userid) {
        this.user.user_id = JSON.parse(userid);
      } else {
        this.user.user_id = this.$route.query.user_id;

        sessionStorage.setItem("user_id", JSON.stringify(this.user.user_id));
      }

      const { data: dt } = await this.$http.get("getUser", {
        params: this.user
      });

      if (dt.data.errcode !== 0) {
        return this.$toast.fail({
          message: "获取用户信息失败"
        });
      }
      this.userData = dt.data;
      if (this.userData.avatar) {
        this.headUrl = this.userData.avatar;
      }
      this.userData.department.forEach(e => {
        this.department(e);
      });
    },
    see(e) {
      var w = e.currentTarget.innerText;
      var a = w.trim().split("\n");

      if (a[5] == "发现工程" || a[5] == "待移交") {
        this.$router.push({
          path: "/projectReporting1",
          query: {
            prj_name: a[0]
          }
        });
      } else {
        this.$router.push({
          path: "/projectDetails",
          query: {
            prj_name: a[0]
          }
        });
      }
    },
    async onLoad() {
      var { data: dt } = await this.$http.get(
        "wx/getGongdi_All_History_ByUser",
        { params: this.user }
      );

      this.list = dt;
      this.list.forEach(e => {
        if (e.data.prj_state == "-100") {
          e.data.prj_state = "发现工程";
        }
        if (e.data.prj_state == "-4") {
          e.data.prj_state = "待移交";
        }
        if (e.data.prj_state == "-3") {
          e.data.prj_state = "待移交";
        }
        if (e.data.prj_state == "-2") {
          e.data.prj_state = "已受理，待审核";
        }
        if (e.data.prj_state == "-1") {
          e.data.prj_state = "受理审核未通过";
        }
        if (e.data.prj_state == "0") {
          e.data.prj_state = "受理审核通过";
        }
        if (e.data.prj_state == "1") {
          e.data.prj_state = "正在移交";
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
        if (e.data.prj_state == "8") {
          e.data.prj_state = "已竣工";
        }
        let str = e.data.updateTime.split(" ");
        e.data.updateTime = str[0];
      });
      // this.list1 = this.list;
      // // 加载状态结束
      this.loading = false;
      this.finished = true;
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  },
  created() {
    this.content();
  }
};
</script>
<style lang="less" scoped>
.title {
  padding: 30px;
  background: #f3f7fa;
}
.user {
  background: #fff;
  padding: 30px;
  .icn {
    width: 110px;
    height: 110px;
    background: #f2f6f7;
    border: 2px solid rgba(217, 220, 222, 1);
    border-radius: 50%;
    position: relative;
  }
  .header {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #d8d8d8;
    font-size: 40px;
  }
  .name {
    margin-left: 20px;
    .name1 {
      font-size: 30px;
      font-weight: 500;
    }
    .name2 {
      font-size: 24px;
      color: #d8d8d8;
    }
  }
  .xiaoxi {
    font-size: 40px;
    color: #d8d8d8;
  }
}
.box {
  background: #f3f7fa;
}
.g_box {
  padding: 30px;
}
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
.shuom {
  font-size: 14px;
  color: #666666;
}
</style>
