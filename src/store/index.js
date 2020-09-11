import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    qingqiuUrl: `http://hptest.soyumall.cn:8080/gongdi/%23`,
    articlesUrl: `http://hptest.soyumall.cn/oauth/wx_login?callback=`,
    xiaoxitu: `http://hptest.soyumall.cn:8080/gongdi/`,
    agentid: "1000101",
    // qingqiuUrl: `http://hpweb.soyumall.cn/gongdi/%23`,
    // articlesUrl: `http://hpapi.soyumall.cn/oauth/wx_login?callback=`,
    // xiaoxitu: `http://hpweb.soyumall.cn/gongdi/`,
    // agentid: "1000201",
    LOADING: false
  },
  mutations: {
    showLoading(state) {
      state.LOADING = true;
    },
    hideLoading(state) {
      state.LOADING = false;
    }
  },
  actions: {},
  modules: {}
});
