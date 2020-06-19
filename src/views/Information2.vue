<!--  -->
<template>
  <div>
    <van-nav-bar id="reset" title="小型工地施工文件照片上传" left-arrow />
    <div class="content">
      <van-row gutter="20">
        <van-col span="12">
          <div class="shangchuan">
            <van-uploader v-model="fileList" multiple :max-count="1" />
            <p>产权证</p>
          </div>
        </van-col>
        <van-col span="12">
          <div class="shangchuan">
            <van-uploader v-model="fileList" multiple :max-count="1" />
            <p>租赁合同</p>
          </div>
        </van-col>
      </van-row>
      <van-row gutter="20">
        <van-col span="12">
          <div class="shangchuan">
            <van-uploader v-model="fileList" multiple :max-count="1" />
            <p>施工合同</p>
          </div>
        </van-col>
        <van-col span="12">
          <div class="shangchuan">
            <van-uploader v-model="fileList" multiple :max-count="1" />
            <p>施工单位营业执照</p>
          </div>
        </van-col>
      </van-row>
      <van-row gutter="20">
        <van-col span="12">
          <div class="shangchuan">
            <van-uploader v-model="fileList" multiple :max-count="1" />
            <p>施工单位资质证书</p>
          </div>
        </van-col>
        <van-col span="12">
          <div class="shangchuan">
            <van-uploader v-model="fileList" multiple :max-count="1" />
            <p>项目经理证书</p>
          </div>
        </van-col>
      </van-row>
      <van-row gutter="20">
        <van-col span="12">
          <div class="shangchuan">
            <van-uploader v-model="fileList" multiple :max-count="1" />
            <p>安全员证书</p>
          </div>
        </van-col>
        <van-col span="12">
          <div class="shangchuan">
            <van-uploader v-model="fileList" multiple :max-count="1" />
            <p>项目经理任命文件</p>
          </div>
        </van-col>
      </van-row>
      <van-row gutter="20">
        <van-col span="12">
          <div class="shangchuan">
            <van-uploader v-model="fileList" multiple :max-count="1" />
            <p>安全员任命文件</p>
          </div>
        </van-col>
        <van-col span="12">
          <div class="shangchuan">
            <van-uploader v-model="fileList" multiple :max-count="1" />
            <p>设计单位资质文件</p>
          </div>
        </van-col>
      </van-row>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          下一步
        </van-button>
      </div>
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
      fileList: [{ url: "https://img.yzcdn.cn/vant/leaf.jpg" }]
    };
  },
  //方法集合
  methods: {},
  created() {}
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
.content {
  padding: 30px;
}
.shangchuan {
  text-align: center;
  p {
    text-align: center;
    color: #343434ff;
    font-size: 19px;
  }
}
.van-row {
  margin-top: 20px;
}
</style>
