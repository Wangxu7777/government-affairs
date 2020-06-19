import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// import router from "./router.js";
import "./assets/css/global.css";
import store from "./store";
import Vant from "vant";
import "vant/lib/index.css";
Vue.use(Vant);
import "./rem";
import IconSvg from "./components/icon-components.vue";
Vue.component("icon-svg", IconSvg);
// 引入axios并配置
import axios from "./http";
Vue.prototype.$http = axios;

import BaiduMap from "vue-baidu-map";

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: "ZN1OYcFhat5O5I3nh9KCBd4LMehvnG6D"
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
