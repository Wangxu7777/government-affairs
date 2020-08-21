// 引入axios并配置
import axios from "axios";

import store from "./store/index.js";

// 请求拦截器
axios.interceptors.request.use(
  function(config) {
    store.commit("showLoading");
    return config;
  },
  function(error) {
    store.commit("hideLoading");
    return Promise.reject(error);
  }
);

//响应拦截器
axios.interceptors.response.use(
  response => {
    store.commit("hideLoading");
    return response;
  },
  error => {
    store.commit("hideLoading");
    return Promise.reject(error);
  }
);
// 给axios配置请求拦截器
// axios.interceptors.request.use(
//   function(config) {
//     var token = window.sessionStorage.getItem("userId");
//     config.headers.userId = token;
//     return config;
//   },
//   function(ereor) {
//     return Promise.reject(ereor);
//   }
// );
// 基准路径
// axios.defaults.withCredentials = true;

axios.defaults.baseURL = "http://hptest.soyumall.cn";
// axios.defaults.baseURL = "http://111.229.190.8";
// axios.defaults.baseURL = "http://172.82.4.51:8082";
// axios.defaults.baseURL = "http://173.82.57.48:8082";
// axios.defaults.baseURL = "http://hpapi.soyumall.cn";
// axios.defaults.baseURL = userIP;
export default axios;
