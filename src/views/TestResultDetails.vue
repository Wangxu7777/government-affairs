<!--  -->
<template>
  <div>
    <van-nav-bar
      id="reset"
      title="查询结果页"
      left-arrow
      @click-left="onClickLeft"
    />
    <p class="p_biaoti">小型工程施工信息表</p>
    <div class="biaoti">
      <van-icon name="completed" />
      <span v-if="this.form.prj_state == '6' || this.form.prj_state == '7'"
        >已督察</span
      >
      <span v-if="this.form.prj_state == '8'">已竣工</span>
    </div>
    <van-cell-group>
      <van-field
        label="工程名称"
        value="输入框只读"
        v-model="form.prj_name"
        readonly
      />
      <van-field label="工程地址" value="" v-model="form.prj_addr" readonly />
      <van-field label="建设单位" value="" v-model="form.demand_com" readonly />
      <van-field
        label="施工单位"
        value=""
        v-model="form.construction_com"
        readonly
      />
      <van-field
        label="监理单位"
        value=""
        v-model="form.supervison_com"
        readonly
      />
      <van-field label="设计单位" value="" v-model="form.design_rom" readonly />
      <van-field label="开工日期" value="" v-model="form.start_date" readonly />
      <van-field
        label="竣工日期"
        value=""
        v-model="form.completion_date"
        readonly
      />
      <van-button class="xiangxi" @click="xiangxi" type="default"
        >详细资料 ></van-button
      >
    </van-cell-group>
    <p class="p_biaoti">施工检查记录</p>
    <div class="buzhoutiao">
      <van-steps direction="vertical" :active="tableData.lenght">
        <van-step v-for="(item, i) in tableData" :key="i">
          <div @click="see(item)">
            <h3
              :style="
                item.prj_state == '检查合格' ? 'color: #07c160;' : 'color: red;'
              "
            >
              {{ item.check_depart }}—{{ item.prj_state }}
            </h3>
            <p
              :style="
                item.prj_state == '检查合格' ? 'color: #07c160;' : 'color: red;'
              "
            >
              {{ item.updateTime }}
            </p>
          </div>
        </van-step>
      </van-steps>
    </div>

    <div style="margin: 16px;">
      <van-button
        @click="shouye"
        class="btn1"
        round
        block
        type="info"
        native-type="submit"
      >
        返回首页
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
      form: {
        userid: "",
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
        prj_person_phone: "",
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
        prj_assist_org: "",
        prj_state: ""
      },
      gongchengData: {
        prj_name: ""
      },
      tableData: [],
      tableFrom: {
        prj_name: "",
        prj_state: "6,7"
      },
      auth: {}
    };
  },
  //方法集合
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    see(e) {
      // var w = e.currentTarget.innerText;
      // var a = w.trim().split("\n");

      this.$router.push({
        name: "Details3",
        params: {
          row: e
        }
      });
    },
    shouye() {
      this.$router.push({ name: "Index" });
    },

    xiangxi() {
      this.$router.push({
        path: "/details",
        query: {
          prj_name: this.gongchengData.prj_name
        }
      });
    },
    async jianchaList() {
      var { data: dt } = await this.$http.get(
        "wx/getGongdi_info_ByNameAndState",
        {
          params: this.tableFrom
        }
      );
      this.tableData = dt;
      this.tableData.forEach(e => {
        if (e.prj_state == "6") {
          e.prj_state = "检查不合格";
        }
        if (e.prj_state == "7") {
          e.prj_state = "检查合格";
        }
      });

      // this.total = Math.ceil(dt.data.total / this.tableFrom.limit);
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
        this.form.userid = JSON.parse(userid);
      } else {
        this.form.userid = this.$route.query.userid;

        sessionStorage.setItem("user_id", this.$route.query.userid);
      }
      this.gongchengData.prj_name = this.$route.query.prj_name;
      var { data: dt } = await this.$http.get("/wx/getGongdi_info", {
        params: this.gongchengData
      });

      this.tableFrom.prj_name = dt.prj_name;
      this.form.prj_state = dt.prj_state;
      this.form.prj_name = dt.prj_name;
      this.form.prj_addr = dt.prj_addr;
      this.form.prj_type = dt.prj_type;
      this.form.prj_area = dt.prj_area;
      this.form.prj_price = dt.prj_price;
      this.form.demand_com = dt.demand_com;
      this.form.construction_com = dt.construction_com;
      this.form.supervison_com = dt.supervison_com;
      this.form.design_rom = dt.design_rom;
      this.form.start_date = dt.start_date;
      this.form.completion_date = dt.completion_date;
      this.form.fbi_name = dt.fbi_name;
      this.form.fbi_phone = dt.fbi_phone;
      this.form.prj_person_name = dt.prj_person_name;
      this.form.prj_person_phone = dt.prj_person_phone;
      this.form.prj_assist_org = dt.prj_assist_org;

      this.jianchaList();
    }
  },
  created() {
    this.content();
    localStorage.removeItem("jianchaData");
  }
};
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.buzhoutiao {
  height: 500px;
  overflow: auto;
}
.xiangxi {
  border: 0px;
  color: #666666;
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
#reset /deep/ .van-nav-bar__text {
  color: #fff !important;
}
.p_biaoti {
  color: #343434ff;
  font-size: 24px;
  padding: 30px;
  background-color: #f0f0f0ff;
}
.icn_box {
  width: 45px;
  height: 42px;
  color: #00d2ffff;
}
.biaoti {
  padding: 30px;
  span {
    font-size: 36px;
    color: rgba(52, 52, 52, 1);
  }
}
.buju {
  padding: 30px;
}
.beijin {
  position: relative;
  height: 110px;
  background: rgba(249, 249, 249, 1);
  box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.09);
  border-radius: 10px;
}
.wenjian_box {
  width: 60px;
  height: 60px;
  background: rgba(0, 129, 255, 1);
  opacity: 0.5;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .icn_box1 {
    width: 23px;
    height: 30px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
.wenjianming {
  font-size: 18px;
  color: rgba(52, 52, 52, 1);
  padding: 10px;
  background-color: #fff;
  text-align: center;
}
.btn1 {
  background: linear-gradient(
    -90deg,
    rgba(253, 203, 1, 1) 0%,
    rgba(255, 235, 0, 1) 100%
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
