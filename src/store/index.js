import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    qingqiuUrl: `http://hpapi.soyumall.cn:8080/gongdi/%23`,
    articlesUrl: `http://hpapi.soyumall.cn/oauth/wx_login?callback=`,
    xiaoxitu: `http://hpapi.soyumall.cn:8080/gongdi/`
    // qingqiuUrl:`http://hpweb.soyumall.cn/gongdi/%23`,
    // articlesUrl: `http://hptest.soyumall.cn/oauth/wx_login?callback=`,
    // xiaoxitu: `http://hpweb.soyumall.cn/gongdi/`,
  },
  mutations: {},
  actions: {},
  modules: {}
});
