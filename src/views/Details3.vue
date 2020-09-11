<!--  -->
<template>
  <div>
    <van-nav-bar
      id="reset"
      title="小型工程检查记录单"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- <div class="biaoti">
      <span class="hege" v-if="this.jianchaData.prj_state == '7'"
        >检查合格</span
      >
      <span class="buhege" v-if="this.jianchaData.prj_state == '6'"
        >检查不合格</span
      >
    </div> -->
    <!-- <van-cell-group>
      <van-field label="工程名称" :value="prj_name" readonly />
      <van-field label="工程地址" :value="prj_addr" readonly />
      <van-field label="建设单位" :value="demand_com" readonly />
      <van-field label="施工单位" :value="construction_com" readonly />
      <van-field label="监理单位" :value="supervison_com" readonly />
      <van-field label="设计单位" :value="design_rom" readonly />
      <van-field label="项目负责人" :value="prj_person_name" readonly />
      <van-field label="负责人电话" :value="prj_person_phone" readonly />
    </van-cell-group> -->

    <p>监督检查记录</p>
    <van-cell-group>
      <van-field
        label="监督检查部门"
        :value="jianchaData.check_depart"
        readonly
      />
      <van-field label="检察人员" :value="jianchaData.check_person" readonly />
      <van-field
        label="检查内容"
        v-model="jianchaData.check_content"
        type="textarea"
        autosize
        readonly
      />
      <van-field
        label="存在问题"
        v-model="jianchaData.check_question"
        type="textarea"
        autosize
        readonly
      />
      <van-field
        label="整改情况"
        v-model="jianchaData.change_desp"
        type="textarea"
        autosize
        readonly
      />
    </van-cell-group>
    <div class="tupian">
      <h5>现场照片</h5>
      <van-grid :column-num="2" square :gutter="10">
        <van-grid-item
          text="现场照片"
          v-for="(item, i) in change_pictures"
          :key="i"
        >
          <van-image
            @click="show_before_img"
            width="100%"
            height="100%"
            :src="item"
          />
        </van-grid-item>
        <van-empty
          style="width:100%"
          image="error"
          description="无工程照片"
          v-if="this.change_pictures.length == 0"
        />
      </van-grid>
    </div>
    <div style="margin: 16px;">
      <van-button @click="shouye" round block type="info" native-type="submit">
        返回首页
      </van-button>
    </div>
  </div>
</template>

<script>
import { ImagePreview } from "vant";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      jianchaData: {},
      check_depart: "",
      check_person: "",
      check_content: "",
      check_question: "",
      change_desp: "",

      change_pictures: [],

      auth: {}
    };
  },
  //方法集合
  methods: {
    show_before_img() {
      this.instance_before = ImagePreview({
        images: this.change_pictures,

        closeable: true
      });
    },

    shouye() {
      this.$router.push({ name: "Index" });
    },
    content() {
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
      const jianchaData = localStorage.getItem("jianchaData");
      if (jianchaData) {
        this.jianchaData = JSON.parse(jianchaData);
      } else {
        this.jianchaData = this.$route.params.row;

        localStorage.setItem("jianchaData", JSON.stringify(this.jianchaData));
      }
      if (this.jianchaData.change_pictures) {
        this.change_pictures = this.jianchaData.change_pictures.split(",");
        this.change_pictures.forEach((e, i) => {
          this.change_pictures[i] =
            `http://hpimage.soyumall.cn/gongdi/file/` + e;
        });
      }
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
//@import url(); 引入公共css类
.tupian {
  h5 {
    padding: 30px;
    font-weight: normal;
    margin: 0;
  }
  p {
    font-size: 24px;
    text-align: center;
  }
  .zhaop {
    margin-top: 20px;
  }
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
p {
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
  .hege {
    display: inline-block;
    width: 170px;
    height: 60px;
    font-size: 26px;
    background: linear-gradient(
      -90deg,
      rgba(109, 223, 88, 1),
      rgba(127, 234, 97, 1)
    );
    text-align: center;
    line-height: 60px;
    margin-right: 10px;
  }
  .buhege {
    display: inline-block;
    width: 170px;
    height: 60px;
    font-size: 26px;
    background: linear-gradient(
      -90deg,
      rgba(245, 63, 51, 1),
      rgba(252, 87, 76, 1)
    );
    text-align: center;
    line-height: 60px;
    margin-right: 10px;
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
.van-button {
  background: linear-gradient(
    -90deg,
    rgba(253, 204, 2, 1) 0%,
    rgba(255, 235, 0, 1) 100%
  );
  color: #343434ff;
  border: 0;
}
</style>
