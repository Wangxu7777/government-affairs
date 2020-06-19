// 引入axios并配置
import axios from "axios";

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

axios.defaults.baseURL = "http://111.229.190.8/";
// axios.defaults.baseURL = "http://192.168.10.61:8080/order/";

// axios.defaults.baseURL = userIP;
export default axios;
